"use client"
import localFont from "next/font/local";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import { SnackbarProvider } from "notistack";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossOrigin="anonymous"></script>
        <SnackbarProvider
          classes={{ containerRoot: "z-alert" }}
          autoHideDuration={3500}
        >
          <NavBar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-3 bg-light p-3">
                <ul className="list-group">
                  <li className={`list-group-item`}>
                    <Link href="/users">Users </Link>
                  </li>
                  <li className={`list-group-item`}>
                    <Link href="/task">Task</Link>
                  </li>
                </ul>
              </div>
              <div className="col-9 p-3">
                {children}
              </div>
            </div>
          </div>
        </SnackbarProvider>
      </body>
    </html>
  );
}
