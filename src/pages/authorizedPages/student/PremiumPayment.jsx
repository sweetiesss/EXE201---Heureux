import { useContext, useEffect, useState } from "react";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import APIServices from "../../../services/APIServices.ts";
import DataContext from "../../../components/setting/ContextData";
import { addDays, format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiMainPort } from "../../../services/ApiConfig.ts";

export function PremiumPayment() {
  // const returnUrl="http://localhost:3000/";
  const returnUrl="https://www.heureux.id.vn/";

  const [currentSubcription, setCurrentSubcription] = useState([]);
  const dataContext = useContext(DataContext);
  const [paymentScription, setPaymentScription] = useState();
  const [refresh,setRefresh]=useState(false);
  const [roleCode,setRoleCode]=useState();
  const resultPayment = useLocation();
  const subIdValue =
    dataContext.data.roleCode === "STUDENT"
      ? 1
      : dataContext.data.roleCode === "LECTURER"
      ? 2
      : -1;

  console.log(resultPayment);
  useEffect(() => {
    setCurrentSubcription(dataContext.supscriptionData);
  }, [dataContext.supscriptionData]);
  useEffect(() => {
    const fetchRolCode = async () => {
      try {
        const result = await APIServices.getAPI(
          "/api/Subscription/GetSubcriptions?pageIndex=0&pageSize=10"
        );
        if (result) {
          setRoleCode(result.items);
        }
      } catch (e) {}
    };
    fetchRolCode();
  }, []);
  useEffect(() => {
    const fetchSub = async () => {
      try {
        const result = await APIServices.getAPI(
          "/api/UserSubscription/GetUserSubscription?pageIndex=0&pageSize=100"
        );
        if (result) {
          const final = result.items.filter(
            (trans) => trans.userId === dataContext.data.id
          );
          const enrichedSubscriptions = final.map((item) => {
            const matchedRole = roleCode.find(
              (role) => role.id === item.subscriptionId
            );
            return matchedRole
              ? { ...item, ...matchedRole }
              : { ...item, name: "Free trial" };
          });
          dataContext.setSupscriptionData(enrichedSubscriptions);
        }
      } catch (e) {}
    };
    fetchSub();
  }, [roleCode,refresh]);
  const nav = useNavigate();
  const hanldeUpdateSub = async () => {
    try {
      let submitForm = {
        buyerEmail: dataContext.data.email,
        cancelUrl: returnUrl+"student/premiumbenefits",
        returnUrl: returnUrl+"student/premiumbenefits",
        description: "Update Studentpackage",
        subscriptionId: subIdValue,
      };
      const result = await APIServices.postAPI(
        "/api/Payment/CreatePaymentLink",
        submitForm
      );
      if (result) {
        console.log(result);
        setPaymentScription(result);
        window.open(result.data.checkoutUrl, "_blank");
        
      }

      // const result=await APIServices.postAPI()
    } catch (e) {}
  };
  console.log(subIdValue);
  useEffect(() => {
    const fetchApi = async () => {
      if (resultPayment.search != "") {
        const formValue = resultPayment.search.split("&");
        console.log(formValue);
        // const result=await APIServices.putAPI("/api/Transaction/UpdateTransaction"+formValue[0]+"&"+""+"?code=00&orderCode=2176&cancel=true&status=CANCELLED")
        const result = await APIServices.putAPI(
          "/api/Transaction/UpdateTransaction" + resultPayment.search
        );
        if (formValue[3].split("=")[1] === "PAID") {
          if (result === 200) {
            const today = format(new Date(), "yyyy-MM-dd");
            let form = {
              StartDate: today,
              SubscriptionId: subIdValue,
              UserId: dataContext.data.id,
            };

            // const form = new FormData();
            // form.append("StartDate", today);
            // form.append("SubscriptionId", subIdValue);
            // form.append("UserId", dataContext.data.id);
            console.log(form);
            await axios
              .post(
                `${apiMainPort}/api/UserSubscription/CreateUserSubscription`,
                form,
                {
                  headers: {
                    accept: "text/plain",
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then((response) => {
                dataContext.setCurrentSubcription()
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        }
        setRefresh((pre)=>!pre)
        nav("../premiumbenefits");
      }
    };
    fetchApi();
  }, [resultPayment.search]);
  return (
    <div className="w-full h-full py-[2rem]">
      <div className="font-semibold text-xl">Digital purchases & rentals</div>
      <div className="mt-[1rem] text-xl">Your current package</div>
      <div
        className={`flex  ${
          currentSubcription.length !== 0 && "justify-around"
        }`}
      >
        {currentSubcription.length !== 0 && (
          <div>
            <div className="border-[0.1rem] border-black w-[40rem] px-[2rem] py-[2rem] rounded-xl mt-[2rem]">
              <div className="text-2xl">Detail your membership</div>
              <div className="border-[0.1rem] border-black w-full my-[1rem]"></div>
              <div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <div>User email</div>
                  <div className="ml-[1rem] text-gray-400">
                    {currentSubcription[0]?.userEmail}
                  </div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <div>Name package:</div>
                  <div className="ml-[1rem] text-gray-400">
                    {currentSubcription[0]?.name}
                  </div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <div>Start date:</div>
                  <div className="ml-[1rem] text-gray-400">
                    {currentSubcription[0]?.startDate &&
                      format(currentSubcription[0]?.startDate, "dd-MM-yyyy")}
                  </div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <div>End date:</div>
                  <div className="ml-[1rem] text-gray-400">
                    {currentSubcription[0]?.startDate &&
                      format(
                        addDays(currentSubcription[0]?.startDate, 30),
                        "dd-MM-yyyy"
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          {currentSubcription &&
          currentSubcription[0]?.name === "Student package" ? (
            <div className="border-[0.1rem] border-black w-[40rem] px-[2rem] py-[2rem] rounded-xl mt-[2rem]">
              <div className="text-2xl">Student Premium</div>
              <div className="text-gray-500">
                Account membership: ₫39,000/month (excludes VAT)
              </div>
              <div className="border-[0.1rem] border-black w-full my-[1rem]"></div>
              <div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiCheckBold className="text-green-500 text-2xl mr-[1rem]" />
                  <div>Unlimited creating team</div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiCheckBold className="text-green-500 text-2xl mr-[1rem]" />
                  <div>Unlimited adding up members in team.</div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiCheckBold className="text-green-500 text-2xl mr-[1rem]" />
                  <div>Have report function for team </div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiCheckBold className="text-green-500 text-2xl mr-[1rem]" />
                  <div>Have dashboard function for team </div>
                </div>
              </div>
            </div>
          ) : currentSubcription[0]?.name === "Lecturer package" ? (
            <div className="border-[0.1rem] border-black w-[40rem] px-[2rem] py-[2rem] rounded-xl mt-[2rem]">
              <div className="text-2xl">Lecturer Premium</div>
              <div className="text-gray-500">
                Account membership: ₫59,000/month (excludes VAT)
              </div>
              <div className="border-[0.1rem] border-black w-full my-[1rem]"></div>
              <div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiCheckBold className="text-green-500 text-2xl mr-[1rem]" />
                  <div>Unlimited creating class</div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiCheckBold className="text-green-500 text-2xl mr-[1rem]" />
                  <div>Unlimited creating team</div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiCheckBold className="text-green-500 text-2xl mr-[1rem]" />
                  <div>Unlimited adding up members in class/team.</div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiCheckBold className="text-green-500 text-2xl mr-[1rem]" />
                  <div>Have report function for class/team </div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiCheckBold className="text-green-500 text-2xl mr-[1rem]" />
                  <div>Have dashboard function for class/team </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-[0.1rem] border-black w-[40rem] px-[2rem] py-[2rem] rounded-xl mt-[2rem]">
              <div className="flex">
                <div className="text-2xl items-center justify-between w-full">
                  FreeTrial
                </div>
                <div
                  className="cursor-pointer bg-green-500 text-white px-[1rem] py-[0.3rem] text-center border-b-[0.2rem] border-black"
                  onClick={hanldeUpdateSub}
                >
                  Update
                </div>
              </div>
              <div className="border-[0.1rem] border-black w-full my-[1rem]"></div>
              <div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiCheckBold className="text-green-500 text-2xl mr-[1rem]" />
                  <div>Only create 1 team</div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiCheckBold className="text-green-500 text-2xl mr-[1rem]" />
                  <div>Add up to 5 members in team.</div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiXBold className="text-red-500 text-2xl mr-[1rem]" />
                  <div>No report function for team </div>
                </div>
                <div className="flex items-center text-xl mt-[1rem]">
                  <PiXBold className="text-red-500 text-2xl mr-[1rem]" />
                  <div>No dashboard function for team </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
