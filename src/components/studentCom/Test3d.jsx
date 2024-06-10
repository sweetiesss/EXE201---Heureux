import {
  PiCheckCircleFill,
  PiListBullets,
  PiXCircleFill,
} from "react-icons/pi";
import "../../styles/test.css";

import { useRef, useState } from "react";

export default function TestFunc({ arrayOfContent }) {
  return (
    <div className="container">
      <div className="spinner">
        <div
          style={{ "--i": 1 }}
          className="bg-white card absolute task task-center   mx-[1.5rem] min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <p>Test</p>
            <p
              className="text-gray-400"
              style={{ fontSize: "0.5rem", lineHeight: "1rem" }}
            >
              3 days left
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white ml-[0.5rem]">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <PiXCircleFill className="text-red-500 text-2xl" />
              <PiCheckCircleFill className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
        <div
          style={{ "--i": 2 }}
          className="bg-white card absolute task task-center   mx-[1.5rem] min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <p>Test</p>
            <p
              className="text-gray-400"
              style={{ fontSize: "0.5rem", lineHeight: "1rem" }}
            >
              3 days left
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white ml-[0.5rem]">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <PiXCircleFill className="text-red-500 text-2xl" />
              <PiCheckCircleFill className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
        <div
          style={{ "--i": 3 }}
          className="bg-white card absolute task task-center   mx-[1.5rem] min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <p>Test</p>
            <p
              className="text-gray-400"
              style={{ fontSize: "0.5rem", lineHeight: "1rem" }}
            >
              3 days left
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white ml-[0.5rem]">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <PiXCircleFill className="text-red-500 text-2xl" />
              <PiCheckCircleFill className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
        <div
          style={{ "--i": 4 }}
          className="bg-white card absolute task task-center   mx-[1.5rem] min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <p>Test</p>
            <p
              className="text-gray-400"
              style={{ fontSize: "0.5rem", lineHeight: "1rem" }}
            >
              3 days left
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white ml-[0.5rem]">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <PiXCircleFill className="text-red-500 text-2xl" />
              <PiCheckCircleFill className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
        <div
          style={{ "--i": 5 }}
          className="bg-white card absolute task task-center   mx-[1.5rem] min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <p>Test</p>
            <p
              className="text-gray-400"
              style={{ fontSize: "0.5rem", lineHeight: "1rem" }}
            >
              3 days left
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white ml-[0.5rem]">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <PiXCircleFill className="text-red-500 text-2xl" />
              <PiCheckCircleFill className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
        <div
          style={{ "--i": 6 }}
          className="bg-white card absolute task task-center   mx-[1.5rem] min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <p>Test</p>
            <p
              className="text-gray-400"
              style={{ fontSize: "0.5rem", lineHeight: "1rem" }}
            >
              3 days left
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white ml-[0.5rem]">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <PiXCircleFill className="text-red-500 text-2xl" />
              <PiCheckCircleFill className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
        <div
          style={{ "--i": 7 }}
          className="bg-white card absolute task task-center   mx-[1.5rem] min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <p>Test</p>
            <p
              className="text-gray-400"
              style={{ fontSize: "0.5rem", lineHeight: "1rem" }}
            >
              3 days left
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white ml-[0.5rem]">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <PiXCircleFill className="text-red-500 text-2xl" />
              <PiCheckCircleFill className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
        <div
          style={{ "--i": 8 }}
          className="bg-white card absolute task task-center   mx-[1.5rem] min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <p>Test</p>
            <p
              className="text-gray-400"
              style={{ fontSize: "0.5rem", lineHeight: "1rem" }}
            >
              3 days left
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white ml-[0.5rem]">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <PiXCircleFill className="text-red-500 text-2xl" />
              <PiCheckCircleFill className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
        <div
          style={{ "--i": 9 }}
          className="bg-white card absolute task task-center   mx-[1.5rem] min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <p>Test</p>
            <p
              className="text-gray-400"
              style={{ fontSize: "0.5rem", lineHeight: "1rem" }}
            >
              3 days left
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white ml-[0.5rem]">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <PiXCircleFill className="text-red-500 text-2xl" />
              <PiCheckCircleFill className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
        <div
          style={{ "--i": 10 }}
          className="bg-white card absolute task task-center   mx-[1.5rem] min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <p>Test</p>
            <p
              className="text-gray-400"
              style={{ fontSize: "0.5rem", lineHeight: "1rem" }}
            >
              3 days left
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
              <div className="flex items-center ">
                <div className="bg-gray-400 rounded-full text-xs p-1 text-white ml-[0.5rem]">
                  <PiListBullets />
                </div>

                {arrayOfContent?.submited && (
                  <div className="ml-[0.2rem] text-xs">
                    {arrayOfContent?.submited}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <PiXCircleFill className="text-red-500 text-2xl" />
              <PiCheckCircleFill className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestFunc2({ arrayOfContent }) {
  const taskContainer = useRef();
  const [centered, setCentered] = useState(1);
  const array = [
    {
      title: "test",
    },
    {
      title: "test1",
    },
    {
      title: "test2",
    },
    {
      title: "test3",
    },
    {
      title: "test4",
    },
  ];

  return (
    <div className="task_container">
      <div className="relative" ref={taskContainer}>
        {array.map((box, index) => (
          <div
            className={`bg-white absolute task  ${
              centered === index
                ? "task-center"
                : centered > index && centered - 1 >= 0
                ? "task-top"
                : centered < index && centered + 1 <= array.length
                ? "task-bottom"
                : "hidden"
            } transition-all  min-h-[3rem] px-[0.5rem] py-[0.3rem] rounded-xl`}
          >
            <div className="flex justify-between items-center">
              <p>{box.title}</p>
              <p
                className="text-gray-400"
                style={{ fontSize: "0.5rem", lineHeight: "1rem" }}
              >
                3 days left
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex items-center ">
                  <div className="bg-gray-400 rounded-full text-xs p-1 text-white">
                    <PiListBullets />
                  </div>

                  {arrayOfContent?.submited && (
                    <div className="ml-[0.2rem] text-xs">
                      {arrayOfContent?.submited}
                    </div>
                  )}
                </div>
                <div className="flex items-center ">
                  <div className="bg-gray-400 rounded-full text-xs p-1 text-white ml-[0.5rem]">
                    <PiListBullets />
                  </div>

                  {arrayOfContent?.submited && (
                    <div className="ml-[0.2rem] text-xs">
                      {arrayOfContent?.submited}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex">
                <PiXCircleFill className="text-red-500 text-2xl" />
                <PiCheckCircleFill className="text-green-500 text-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
