import React, { useState } from "react";
import { useEffect } from "react";
import {
  BookIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  TagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../assets/svg/SvgIcons";

const StudyCreationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    maxParticipants: 5,
    startDate: "",
    duration: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}, Type: ${typeof value}`);
    if (name === "maxParticipants") {
      setFormData({ ...formData, [name]: parseInt(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Final Form Data:", formData);
    // 실제로는 여기에 API 호출 로직을 구현합니다.
    const message = "스터디 생성이 완료되었습니다!";
    // alert 대신 커스텀 모달 UI를 사용합니다.
    const messageBox = document.createElement("div");
    messageBox.className =
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    messageBox.innerHTML = `
      <div class="bg-white rounded-lg p-6 shadow-xl text-center max-w-sm w-full">
        <p class="text-lg font-semibold text-gray-800 mb-4">${message}</p>
        <button onclick="this.parentNode.parentNode.remove()" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">확인</button>
      </div>
    `;
    document.body.appendChild(messageBox);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 body의 overflow를 hidden으로 설정하여 스크롤을 막습니다.
    document.body.style.overflow = "hidden";

    // 컴포넌트가 언마운트될 때 원래대로 되돌립니다.
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn transition-opacity duration-500">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookIcon className="w-6 h-6 mr-2 text-blue-500" /> 기본 정보
            </h3>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                스터디 제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="스터디 제목을 입력해주세요"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                스터디 설명
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="스터디의 목표, 진행 방식, 학습 자료 등을 자세히 설명해주세요."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                스터디 태그
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="#리액트 #프론트엔드 (쉼표 또는 공백으로 구분)"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fadeIn transition-opacity duration-500">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <UsersIcon className="w-6 h-6 mr-2 text-blue-500" /> 모집 정보
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="maxParticipants"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  모집 인원
                </label>
                <input
                  type="number"
                  id="maxParticipants"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  스터디 시작일
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                스터디 기간
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              >
                <option value="">기간 선택</option>
                <option value="1개월">1개월</option>
                <option value="3개월">3개월</option>
                <option value="6개월">6개월</option>
                <option value="장기">장기 (6개월 이상)</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-fadeIn transition-opacity duration-500">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <CheckCircleIcon className="w-8 h-8 mr-2 text-green-500" /> 모든
              정보가 준비되었습니다!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center -mt-4">
              아래 정보를 다시 한번 확인하고 스터디를 생성해주세요.
            </p>

            <div className="space-y-4">
              <div className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm">
                <BookIcon className="w-6 h-6 mr-4 text-blue-500" />
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    스터디 제목
                  </h4>
                  <p className="text-gray-900 dark:text-white font-bold">
                    {formData.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm">
                <UsersIcon className="w-6 h-6 mr-4 text-blue-500" />
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    모집 인원
                  </h4>
                  <p className="text-gray-900 dark:text-white font-bold">
                    {formData.maxParticipants}명
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm">
                <UsersIcon className="w-6 h-6 mr-4 text-blue-500" />
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    시작일
                  </h4>
                  <p className="text-gray-900 dark:text-white font-bold">
                    {formData.startDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm">
                <ClockIcon className="w-6 h-6 mr-4 text-blue-500" />
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    기간
                  </h4>
                  <p className="text-gray-900 dark:text-white font-bold">
                    {formData.duration}
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm">
                <TagIcon className="w-6 h-6 mr-4 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    태그
                  </h4>
                  <p className="text-gray-900 dark:text-white font-bold">
                    {formData.tags || "없음"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                스터디 설명
              </h4>
              <p className="text-gray-900 dark:text-white">
                {formData.description}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #f0f4f8, #c1d5e0)" }}
    >
      <div className="bg-white/30 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl w-full max-w-3xl transform transition-all duration-300">
        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            새로운 스터디 만들기
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            팀원들과 함께 성장할 멋진 스터디를 계획해 보세요.
          </p>

          {/* 진행바 섹션 */}
          <div className="relative pt-1 mb-8">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <div
                className={`flex-1 text-center font-medium ${
                  step >= 1 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                기본 정보
              </div>
              <div
                className={`flex-1 text-center font-medium ${
                  step >= 2 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                모집 정보
              </div>
              <div
                className={`flex-1 text-center font-medium ${
                  step >= 3 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                최종 확인
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderFormStep()}

            <div className="mt-10 flex justify-between items-center">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="py-3 px-6 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-200 flex items-center whitespace-nowrap"
                >
                  <ChevronLeftIcon className="w-4 h-4 mr-2" /> 이전
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center whitespace-nowrap ml-auto"
                >
                  다음 <ChevronRightIcon className="w-4 h-4 ml-2" />
                </button>
              )}
              {step === 3 && (
                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center whitespace-nowrap ml-auto"
                  >
                    스터디 생성하기
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudyCreationForm;
