import PrimaryLayout from "@/components/Layout/PrimaryLayout";
import OtpVerification from "@/components/OtpVerification/OtpVerification";

const VerifyEmail = ({searchParams}) => {
    return (
        <PrimaryLayout>
           <OtpVerification searchParams={searchParams}/>
        </PrimaryLayout>
    );
}

export default VerifyEmail;
