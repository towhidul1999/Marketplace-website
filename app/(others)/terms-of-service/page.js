import Breadcrumb from "@/components/Layout/Breadcrumb";
import PrimaryLayout from "@/components/Layout/PrimaryLayout";

export const metadata = {
  title: "Terms of Service",
};

const page = () => {
  return (
    <>
      <PrimaryLayout>
        <Breadcrumb
          title={"CNNCTR Terms of Service"}
          pathTitle={"Terms of Service"}
          path={"/terms-of-service"}
        />
        <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 shadow rounded-lg">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-4">
                Welcome to CNNCTR&lsquo;s Terms of Service. These terms and
                conditions outline the rules and regulations for the use of
                CNNCTR&lsquo;s Website.
              </p>
              <p className="mb-4">
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use CNNCTR if you do not agree to
                take all of the terms and conditions stated on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">License</h2>
              <p className="mb-4">
                Unless otherwise stated, CNNCTR and/or its licensors own the
                intellectual property rights for all material on CNNCTR. All
                intellectual property rights are reserved. You may access this
                from CNNCTR for your own personal use subjected to restrictions
                set in these terms and conditions.
              </p>
              <p className="mb-4">You must not:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Republish material from CNNCTR</li>
                <li>Sell, rent or sub-license material from CNNCTR</li>
                <li>Reproduce, duplicate or copy material from CNNCTR</li>
                <li>Redistribute content from CNNCTR</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Comments</h2>
              <p className="mb-4">
                Parts of this website offer an opportunity for users to post and
                exchange opinions and information in certain areas of the
                website. CNNCTR does not filter, edit, publish or review
                Comments prior to their presence on the website. Comments do not
                reflect the views and opinions of CNNCTR, its agents and/or
                affiliates. Comments reflect the views and opinions of the
                person who post their views and opinions.
              </p>
              <p className="mb-4">
                CNNCTR reserves the right to monitor all Comments and to remove
                any Comments which can be considered inappropriate, offensive or
                causes breach of these Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Content Liability</h2>
              <p className="mb-4">
                We shall not be hold responsible for any content that appears on
                your Website. You agree to protect and defend us against all
                claims that is rising on your Website. No link(s) should appear
                on any Website that may be interpreted as libelous, obscene or
                criminal, or which infringes, otherwise violates, or advocates
                the infringement or other violation of, any third party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Privacy</h2>
              <p className="mb-4">Please read our Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Reservation of Rights
              </h2>
              <p className="mb-4">
                We reserve the right to request that you remove all links or any
                particular link to our Website. You approve to immediately
                remove all links to our Website upon request. We also reserve
                the right to amen these terms and conditions and it’s linking
                policy at any time. By continuously linking to our Website, you
                agree to be bound to and follow these linking terms and
                conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Removal of links from our website
              </h2>
              <p className="mb-4">
                If you find any link on our Website that is offensive for any
                reason, you are free to contact and inform us any moment. We
                will consider requests to remove links but we are not obligated
                to or so or to respond to you directly.
              </p>
              <p className="mb-4">
                We do not ensure that the information on this website is
                correct, we do not warrant its completeness or accuracy; nor do
                we promise to ensure that the website remains available or that
                the material on the website is kept up to date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
              <p className="mb-4">
                To the maximum extent permitted by applicable law, we exclude
                all representations, warranties and conditions relating to our
                website and the use of this website. Nothing in this disclaimer
                will:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>
                  limit or exclude our or your liability for death or personal
                  injury;
                </li>
                <li>
                  limit or exclude our or your liability for fraud or fraudulent
                  misrepresentation;
                </li>
                <li>
                  limit any of our or your liabilities in any way that is not
                  permitted under applicable law; or
                </li>
                <li>
                  exclude any of our or your liabilities that may not be
                  excluded under applicable law.
                </li>
              </ul>
              <p className="mb-4">
                The limitations and prohibitions of liability set in this
                Section and elsewhere in this disclaimer: (a) are subject to the
                preceding paragraph; and (b) govern all liabilities arising
                under the disclaimer, including liabilities arising in contract,
                in tort and for breach of statutory duty.
              </p>
              <p className="mb-4">
                As long as the website and the information and services on the
                website are provided free of charge, we will not be liable for
                any loss or damage of any nature.
              </p>
            </section>
          </div>
        </main>
      </PrimaryLayout>
    </>
  );
};

export default page;
