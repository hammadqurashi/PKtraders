"use client";
import React from "react";
import PersonalInformation from "./PersonalInformation";
import SecurityDetails from "./SecurityDetails";
import AlertsForm from "./AlertsForm";

const MyAccountClient = (props) => {
  return (
    <>
      <div className="bg-white dark:bg-dark-primaryBackground">
        {/* Personal Information */}
        <PersonalInformation
          userDetails={props.userDetails}
          updateUserDetails={props.updateUserDetails}
        />
        {/* Security Details */}
        <SecurityDetails changePassword={props.changePassword} />
        {/* Alerts Form */}
        <AlertsForm />
      </div>
    </>
  );
};
export default MyAccountClient;
