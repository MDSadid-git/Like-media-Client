import React from "react";

const Divider = () => {
  return (
    <div className="py-20">
      <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow  card rounded-box place-items-center">
          <div className="stats shadow flex flex-col w-full lg:flex-row">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Likes</div>
              <div className="stat-value text-primary">25.6K</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Page Views</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    <img
                      src="https://cdn.vox-cdn.com/thumbor/bPCq_c5poRJx4DYSX9p14eDEV1I=/0x0:2040x1360/1400x1400/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/22461377/vpavic_4547_20210421_0022.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="stat-value">86%</div>
              <div className="stat-title">User Post</div>
              <div className="stat-desc text-secondary">31 Post remaining</div>
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="grid flex-grow h-32 card  rounded-box place-items-center">
          <div className="mx-5">
            <h1 className="text-4xl font-bold">Countdown to Like Media!</h1>
            <p className="py-6">
              Innovative print marketing and digital marketing for hyper-local
              branding.
              <br /> Set yourself apart by utilizing our unique hybrid marketing
              agency, Like Media.
            </p>
            <button className="btn btn-secondary">More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Divider;
