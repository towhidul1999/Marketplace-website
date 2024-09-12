import Breadcrumb from "@/components/Layout/Breadcrumb";
import PrimaryLayout from "@/components/Layout/PrimaryLayout";

export const metadata = {
  title: "Privacy Policy",
};

const page = async () => {
  return (
    <>
      <PrimaryLayout>
        <Breadcrumb
          title={"CNNCTR Privacy Policy"}
          pathTitle={"Privacy Policy"}
          path={"/privacy-policy"}
        />
        <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 shadow rounded-lg">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-4">
                Welcome to CNNCTR&rsquo;s Privacy Policy. Your privacy is
                critically important to us. CNNCTR is located at:
              </p>
              <address className="mb-4">
                CNNCTR Inc.
                <br />
                123 Marketplace St.
                <br />
                City, State, ZIP
                <br />
                Country
              </address>
              <p className="mb-4">
                It is CNNCTR&rsquo;s policy to respect your privacy regarding
                any information we may collect while operating our website. This
                Privacy Policy applies to{" "}
                <a
                  href="https://cnnctr.com"
                  className="text-blue-500 hover:text-blue-700"
                >
                  https://cnnctr.com
                </a>{" "}
                (hereinafter, &quot;us&quot;, &quot;we&quot;, or
                &quot;https://cnnctr.com&quot;). We respect your privacy and are
                committed to protecting personally identifiable information you
                may provide us through the Website. We have adopted this privacy
                policy (&quot;Privacy Policy&quot;) to explain what information
                may be collected on our Website, how we use this information,
                and under what circumstances we may disclose the information to
                third parties. This Privacy Policy applies only to information
                we collect through the Website and does not apply to our
                collection of information from other sources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Website Visitors</h2>
              <p className="mb-4">
                Like most website operators, CNNCTR collects
                non-personally-identifying information of the sort that web
                browsers and servers typically make available, such as the
                browser type, language preference, referring site, and the date
                and time of each visitor request. CNNCTR&rsquo;s purpose in
                collecting non-personally identifying information is to better
                understand how CNNCTR&rsquo;s visitors use its website. From
                time to time, CNNCTR may release non-personally-identifying
                information in the aggregate, e.g., by publishing a report on
                trends in the usage of its website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Gathering of Personally-Identifying Information
              </h2>
              <p className="mb-4">
                Certain visitors to CNNCTR&rsquo;s websites choose to interact
                with CNNCTR in ways that require CNNCTR to gather
                personally-identifying information. The amount and type of
                information that CNNCTR gathers depends on the nature of the
                interaction. For example, we ask visitors who sign up for a blog
                at https://cnnctr.com to provide a username and email address.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Security</h2>
              <p className="mb-4">
                The security of your Personal Information is important to us,
                but remember that no method of transmission over the Internet,
                or method of electronic storage is 100% secure. While we strive
                to use commercially acceptable means to protect your Personal
                Information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Advertisements</h2>
              <p className="mb-4">
                Ads appearing on our website may be delivered to users by
                advertising partners, who may set cookies. These cookies allow
                the ad server to recognize your computer each time they send you
                an online advertisement to compile information about you or
                others who use your computer. This information allows ad
                networks to, among other things, deliver targeted advertisements
                that they believe will be of most interest to you. This Privacy
                Policy covers the use of cookies by CNNCTR and does not cover
                the use of cookies by any advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Links To External Sites
              </h2>
              <p className="mb-4">
                Our Service may contain links to external sites that are not
                operated by us. If you click on a third party link, you will be
                directed to that third party&lsquo;s site. We strongly advise
                you to review the Privacy Policy and terms and conditions of
                every site you visit. We have no control over, and assume no
                responsibility for the content, privacy policies or practices of
                any third party sites, products or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Aggregated Statistics
              </h2>
              <p className="mb-4">
                CNNCTR may collect statistics about the behavior of visitors to
                its website. CNNCTR may display this information publicly or
                provide it to others. However, CNNCTR does not disclose your
                personally-identifying information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
              <p className="mb-4">
                To enrich and perfect your online experience, CNNCTR uses
                &quot;Cookies&quot;, similar technologies and services provided
                by others to display personalized content, appropriate
                advertising and store your preferences on your computer. A
                cookie is a string of information that a website stores on a
                visitor&lsquo;s computer, and that the visitor&lsquo;s browser
                provides to the website each time the visitor returns. CNNCTR
                uses cookies to help CNNCTR identify and track visitors, their
                usage of https://cnnctr.com, and their website access
                preferences. CNNCTR visitors who do not wish to have cookies
                placed on their computers should set their browsers to refuse
                cookies before using CNNCTR&rsquo;s websites, with the drawback
                that certain features of CNNCTR&rsquo;s websites may not
                function properly without the aid of cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Privacy Policy Changes
              </h2>
              <p className="mb-4">
                Although most changes are likely to be minor, CNNCTR may change
                its Privacy Policy from time to time, and in CNNCTR&rsquo;s sole
                discretion. CNNCTR encourages visitors to frequently check this
                page for any changes to its Privacy Policy. Your continued use
                of this site after any change in this Privacy Policy will
                constitute your acceptance of such change.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please
                contact us via{" "}
                <a
                  href="mailto:support@cnnctr.com"
                  className="text-blue-500 hover:text-blue-700"
                >
                  email
                </a>{" "}
                or phone.
              </p>
            </section>
          </div>
        </main>
      </PrimaryLayout>
    </>
  );
};

export default page;
