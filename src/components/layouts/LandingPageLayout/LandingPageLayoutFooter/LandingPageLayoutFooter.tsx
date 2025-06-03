import Image from "next/image";
import Link from "next/link";
import { NAVBAR_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constants";

const LandingPageLayoutFooter = () => {
  return (
    <div className="flex flex-col items-center bg-slate-900 py-10 lg:flex-row lg:items-start lg:justify-between lg:p-16">
      <div className="mb-4 lg:mb-0">
        <Image
          src={"/images/general/logo.png"}
          width={100}
          height={50}
          className="w-40 lg:w-60"
          alt="logo"
        />
      </div>
      <div className="mb-4 flex flex-col gap-2 lg:mb-0">
        <div className="text-center lg:text-left">
          <h4 className="text-lg text-white">Customer Service</h4>
          <p className="text-sm text-default-500">
            hello@acara.id | +62 1234 5678 90
          </p>
        </div>
        <div className="text-center lg:text-left">
          <h4 className="text-lg text-white">Office</h4>
          <p className="text-sm text-default-500">
            Jl. Jend. Sudirman No. 1234, Jakarta Pusat
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2 lg:mb-0">
        <h4 className="text-lg text-white">Menu</h4>
        {NAVBAR_ITEMS.map((item) => (
          <Link
            key={`${item.label}-${item.href}`}
            href={item.href}
            className="text-sm text-default-500"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-4">
          {SOCIAL_ITEMS.map((item, index) => (
            <div key={`${item.label}-${index}`}>
              {<item.icon className="text-2xl text-default-500" />}
            </div>
          ))}
        </div>
        <p className="text-sm text-default-500">
          Copyright © 2025 ACARA. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default LandingPageLayoutFooter;
