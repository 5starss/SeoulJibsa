interface SignupTermsProps {
    isAllAgreed: boolean;
    agreements: { terms: boolean; privacy: boolean };
    toggleAll: () => void;
    toggleAgreement: (key: "terms" | "privacy") => void;
}

export default function SignupTerms({
    isAllAgreed,
    agreements,
    toggleAll,
    toggleAgreement,
}: SignupTermsProps) {
    return (
        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 mt-2">
            <div
                className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-4 cursor-pointer"
                onClick={toggleAll}
            >
                <div
                    className={[
                        "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                        isAllAgreed
                            ? "bg-primary border-primary"
                            : "bg-white border-gray-300",
                    ].join(" ")}
                >
                    {isAllAgreed && (
                        <span className="material-symbols-outlined text-white text-sm font-bold">
                            check
                        </span>
                    )}
                </div>
                <span className="font-bold text-gray-800">전체 동의</span>
            </div>

            <div className="space-y-4">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleAgreement("terms")}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className={[
                                "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                                agreements.terms
                                    ? "bg-gray-400 border-gray-400"
                                    : "bg-white border-gray-300",
                            ].join(" ")}
                        >
                            {agreements.terms && (
                                <span className="material-symbols-outlined text-white text-[10px] font-bold">
                                    check
                                </span>
                            )}
                        </div>
                        <span className="text-sm text-gray-600">
                            이용약관 동의 (필수)
                        </span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 text-sm">
                        chevron_right
                    </span>
                </div>

                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleAgreement("privacy")}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className={[
                                "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                                agreements.privacy
                                    ? "bg-gray-400 border-gray-400"
                                    : "bg-white border-gray-300",
                            ].join(" ")}
                        >
                            {agreements.privacy && (
                                <span className="material-symbols-outlined text-white text-[10px] font-bold">
                                    check
                                </span>
                            )}
                        </div>
                        <span className="text-sm text-gray-600">
                            개인정보 수집 동의 (필수)
                        </span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 text-sm">
                        chevron_right
                    </span>
                </div>
            </div>
        </div>
    );
}
