using Application;
using Application.Repositories;
using Application.Utils;
using Application.ViewModels.RequestModels;
using Application.ViewModels.ResponseModels;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using MySqlX.XDevAPI;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices.JavaScript;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace Infrastructures.Repositories
{
    public class PaymentRepository : GenericRepository<BaseEntity>, IPaymentRepository
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _DbContext;
        private readonly IUserRepository _userRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;

        public PaymentRepository(IConfiguration configuration, AppDbContext dbContext, IUserRepository userRepository, ISubscriptionRepository subscriptionRepository)
            : base(dbContext)
        {
            _configuration = configuration;
            _DbContext = dbContext;
            _userRepository = userRepository;
            _subscriptionRepository = subscriptionRepository;
        }

        public async Task<QRPaymentResponseModel> CreatePaymentLink(PaymentRequestModel model)
        {
            var payOS = _configuration.GetSection("PayOS");

            var clientId = payOS["ClientID"];
            var apiKey = payOS["APIKey"];
            var checksum = payOS["ChecksumKey"];

            var user = await _userRepository.GetUser(model.BuyerEmail);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found.");
            }

            var subscription = await _subscriptionRepository.GetByIdAsync(model.SubscriptionId);
            if (subscription == null)
            {
                throw new KeyNotFoundException("Subscription not found");
            }
            int price = Decimal.ToInt32(subscription.Price);

            var data = $"amount={price}" +
                       $"&cancelUrl={model.CancelUrl}" +
                       $"&description={model.Description}" +
                       $"&orderCode={model.OrderCode}" +
                       $"&returnUrl={model.ReturnUrl}";
            


            var signatures = StringUtils.HmacSHA256(data, checksum);

           

            DateTime expiredAtTime = DateTime.Now.AddMinutes(30); 
            long unixTime = new DateTimeOffset(expiredAtTime).ToUnixTimeSeconds();

            var item = new[]
            {
                new
                {
                   name = subscription.Name,
                   quantity = 1,
                   price = subscription.Price
                }
            };

            var requestData = new
            {
                orderCode= model.OrderCode,
                amount= price,
                description= model.Description,
                buyerName= user.Username,
                buyerEmail= model.BuyerEmail,
                buyerPhone= user.Phone,
                buyerAddress= user.Address,
                items = item,
                cancelUrl= model.CancelUrl,
                returnUrl= model.ReturnUrl,
                expiredAt= unixTime,
                signature= signatures,
            };

            var requestDataJson = JsonConvert.SerializeObject(requestData, new JsonSerializerSettings()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                Formatting = Formatting.Indented,
            });

            var requestContent = new StringContent(requestDataJson, Encoding.UTF8, "application/json");
            using HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("x-client-id", clientId);
            client.DefaultRequestHeaders.Add("x-api-key", apiKey);

            var createPaymentLinkRes = client.PostAsync(payOS["POSTpayment-request"], requestContent).Result;

            if (createPaymentLinkRes.IsSuccessStatusCode)
            {
                var responseContent = createPaymentLinkRes.Content.ReadAsStringAsync().Result;
                var responseData = JsonConvert.DeserializeObject<QRPaymentResponseModel>(responseContent);

                string jsonResult = JsonConvert.SerializeObject(responseData);

                if (responseData != null && responseData.Code == "00")
                {
                    //return await System.Threading.Tasks.Task.FromResult(jsonResult);
                    return responseData;
                }
                else 
                {
                    //return await System.Threading.Tasks.Task.FromResult("false");
                    throw new Exception(responseData.Code);
                }
            }
            else
            {
                //return await System.Threading.Tasks.Task.FromResult(createPaymentLinkRes.StatusCode.ToString());
                throw new Exception(createPaymentLinkRes.StatusCode.ToString());
            }
        }

        public async Task<IActionResult> GetPaymentInfo(string paymentId)
        {

            var payOS = _configuration.GetSection("PayOS");

            var clientId = payOS["ClientID"];
            var apiKey = payOS["APIKey"];
            var apiUrl = payOS["GETpayment-info"];

            using HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("x-client-id", clientId);
            client.DefaultRequestHeaders.Add("x-api-key", apiKey);

            HttpResponseMessage response = await client.GetAsync(apiUrl+paymentId);
            if (response.IsSuccessStatusCode)
            {
                string jsonResponse = await response.Content.ReadAsStringAsync();
                return new ContentResult
                {
                    ContentType = "application/json",
                    StatusCode = (int)response.StatusCode,
                    Content = jsonResponse
                };
            }
            else
            {
              throw new Exception(response.StatusCode.ToString());
            }
        }

        public async Task<IActionResult> CancelPayment(string paymentId, string cancelReason)
        {
            var payOS = _configuration.GetSection("PayOS");

            var clientId = payOS["ClientID"];
            var apiKey = payOS["APIKey"];
            var apiUrl = $"https://api-merchant.payos.vn/v2/payment-requests/{paymentId}/cancel";

            using HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("x-client-id", clientId);
            client.DefaultRequestHeaders.Add("x-api-key", apiKey);

            var requestData = new
            {
                cancellationReason= cancelReason
            };

            var requestDataJson = JsonConvert.SerializeObject(requestData, new JsonSerializerSettings()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                Formatting = Formatting.Indented,
            });

            var requestContent = new StringContent(requestDataJson, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PostAsync(apiUrl, requestContent);
            if (response.IsSuccessStatusCode)
            {
                string jsonResponse = await response.Content.ReadAsStringAsync();
                return new ContentResult
                {
                    ContentType = "application/json",
                    StatusCode = (int)response.StatusCode,
                    Content = jsonResponse
                };
            }
            else
            {
                throw new Exception(response.StatusCode.ToString());
            }
        }
    }
}
