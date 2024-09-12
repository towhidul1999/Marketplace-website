import Breadcrumb from "@/components/Layout/Breadcrumb";
import PrimaryLayout from "@/components/Layout/PrimaryLayout";
export const metadata = {
  title: "Trust Safety",
};

const page = () => {
  return (
    <>
      <PrimaryLayout>
        <Breadcrumb
          title={"CNNCTR Trust Safety"}
          pathTitle={"Trust Safety"}
          path={"/trust-safety"}
        />
        <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 shadow rounded-lg">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Our Commitment to Your Safety
              </h2>
              <p className="mb-4">
                At CNNCTR, your safety is our top priority. We strive to create
                a secure and trustworthy environment for all our users. Here’s
                how we ensure the safety and trustworthiness of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Verified Users</h2>
              <p className="mb-4">
                We have a thorough verification process for all our users. This
                includes email verification, phone verification, and identity
                verification to ensure that our marketplace remains safe and
                reliable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Secure Transactions
              </h2>
              <p className="mb-4">
                All transactions on CNNCTR are secured using industry-standard
                encryption protocols. We use trusted payment gateways to process
                payments, ensuring your financial information is protected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Dispute Resolution
              </h2>
              <p className="mb-4">
                In case of disputes between buyers and sellers, our dedicated
                support team is here to help. We have a structured dispute
                resolution process to ensure fair outcomes for all parties
                involved.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                User Feedback and Ratings
              </h2>
              <p className="mb-4">
                We believe in transparency. Users can leave feedback and ratings
                for each other, helping to build a trustworthy community. This
                feedback system ensures accountability and helps users make
                informed decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Prohibited Items and Conduct
              </h2>
              <p className="mb-4">
                We have strict policies against the listing of prohibited items
                and unethical conduct. Any user found violating these policies
                will be subject to account suspension or termination.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Privacy Protection
              </h2>
              <p className="mb-4">
                Your privacy is important to us. We adhere to strict data
                protection policies and ensure that your personal information is
                never shared without your consent. For more details, please read
                our{" "}
                <a
                  href="/privacy-policy"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">24/7 Support</h2>
              <p className="mb-4">
                Our support team is available 24/7 to assist you with any
                concerns or issues. Whether you need help with a transaction or
                have questions about our policies, we’re here to help.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Community Guidelines
              </h2>
              <p className="mb-4">
                To maintain a respectful and safe environment, we have
                established community guidelines that all users must follow.
                These guidelines outline acceptable behavior and help us ensure
                that CNNCTR remains a welcoming platform for everyone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Reporting Issues</h2>
              <p className="mb-4">
                If you encounter any issues or notice any suspicious activity,
                please report it to us immediately. Your vigilance helps us
                maintain the integrity and safety of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
              <p className="mb-4">
                We are committed to providing a safe and trustworthy environment
                for all our users. Thank you for being a part of the CNNCTR
                community and for helping us maintain these standards.
              </p>
            </section>
          </div>
        </main>
      </PrimaryLayout>
    </>
  );
};

export default page;
