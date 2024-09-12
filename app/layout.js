import "./globals.css";
import { Providers } from "./redux/provider";
import { Toaster } from "sonner";
import { MdError } from "react-icons/md";
import { IoIosWarning, IoMdCheckmarkCircle } from "react-icons/io";
import { SocketProvider } from "@/components/Context/SocketProvider";

export const metadata = {
  title: "CNNCTR - Your Service Marketplace",
  description:
    "Our team of experienced professionals is dedicated to delivering exceptional testing services, backed by years of industry knowledge and expertise.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SocketProvider>
            {children}
            <Toaster
              icons={{
                success: (
                  <IoMdCheckmarkCircle className="size-5 text-green-500" />
                ),
                warning: <IoIosWarning className="size-5 text-yellow-500" />,
                error: <MdError className="size-5 text-rose-500" />,
              }}
              position="top-center"
              duration={900}
            />
          </SocketProvider>
        </Providers>
      </body>
    </html>
  );
}
