import { useContext, useEffect, useState } from "react";
import { PiCheckBold, PiXBold } from "react-icons/pi";
import APIServices from "../../../services/APIServices.ts";
import DataContext from "../../../components/setting/ContextData";
import { addDays, format } from "date-fns";

export function PremiumPayment() {
  const [currentSubcription, setCurrentSubcription] = useState([]);
  const dataContext = useContext(DataContext);
  useEffect(() => {
    setCurrentSubcription(dataContext.supscriptionData);
  }, [dataContext.supscriptionData]);
  console.log(currentSubcription);
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
              <div className="text-2xl">FreeTrial</div>
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
