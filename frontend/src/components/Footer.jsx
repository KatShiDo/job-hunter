import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsTelegram, BsGithub } from "react-icons/bs";
import { SlSocialVkontakte } from "react-icons/sl";
import Logo from "./Logo";

export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Logo />
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/KatShiDo/job-hunter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source code
                </Footer.Link>
                <Footer.Link href="#">Documentation</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by='ООО "Свин"'
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://t.me/katshido"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsTelegram}
            />
            <Footer.Icon href="#" icon={SlSocialVkontakte} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
