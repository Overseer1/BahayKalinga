import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";

const TermsConditions = ({ children }) => {
  return (
    <Dialog.Root>
                    <Dialog.Trigger asChild>
                      {children}
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[1024px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                          Terms and Condition
                        </Dialog.Title>
                        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal"></Dialog.Description>
                        <div className="overflow-y-auto max-h-[50vh] p-5 grid gap-2">
                          <div className="font-bold">
                            1. User Data Collection and Usage
                          </div>
                          <div className="pl-6">
                            1.1. As part of the registration process, users are
                            required to provide legitimate and valid
                            information, including but not limited to name,
                            email address, contact number, and any other details
                            necessary for scheduling purposes.
                          </div>
                          <div className="pl-6">
                            1.2. The user acknowledges and agrees that the data
                            provided during registration and any subsequent
                            usage of the platform will be collected, processed,
                            and stored by us solely for the purpose of
                            facilitating scheduling and related services.
                          </div>
                          <div className="pl-6">
                            1.3. We are committed to protecting the user's data
                            and will implement appropriate security measures to
                            safeguard against unauthorized access, disclosure,
                            or alteration of user information.
                          </div>
                          <div className="pl-6">
                            1.4. The user's data will not be shared, sold, or
                            otherwise transferred to any third parties without
                            explicit consent, except in cases where it is
                            required by law or necessary for providing the
                            scheduled services (e.g., sharing the user's contact
                            information with a service provider for an
                            appointment).
                          </div>
                          <div className="pl-6">
                            1.5. Users have the right to access, modify, or
                            delete their personal information from our database.
                            To exercise this right, users can contact us through
                            the provided contact details on our platform.
                          </div>
                          <div className="font-bold">
                            2. User Responsibilities
                          </div>
                          <div className="pl-6">
                            2.1. Users must provide accurate, complete, and
                            up-to-date information during the registration
                            process. It is the user's responsibility to ensure
                            that the information provided remains accurate and
                            current.
                          </div>
                          <div className="pl-6">
                            2.2. Users are solely responsible for maintaining
                            the confidentiality of their login credentials
                            (username and password) and for any activities that
                            occur under their account.
                          </div>
                          <div className="pl-6">
                            2.3. Users must not use the platform for any
                            unlawful, unauthorized, or malicious purposes that
                            may harm the platform, other users, or third
                            parties.
                          </div>
                          <div className="pl-6">
                            2.4. Users must not attempt to gain unauthorized
                            access to the platform, its systems, or the data of
                            other users.
                          </div>
                          <div className="font-bold">
                            3. Service Availability and Limitations
                          </div>
                          <div className="pl-6">
                            3.1. While we strive to provide uninterrupted access
                            to our platform, we do not guarantee its
                            availability at all times. We may temporarily
                            suspend access for maintenance, updates, or other
                            reasons.
                          </div>
                          <div className="pl-6">
                            3.2. The platform's performance and functionality
                            may be subject to limitations due to factors beyond
                            our control, such as internet connectivity, device
                            capabilities, or third-party services.
                          </div>
                          <div className="pl-6">
                            4. Intellectual Property 4.1. All intellectual
                            property rights, including but not limited to
                            copyrights, trademarks, and patents, related to the
                            platform and its content, are owned by us or our
                            licensors.
                          </div>
                          <div className="pl-6">
                            4.2. Users must not reproduce, modify, distribute,
                            or create derivative works based on the platform or
                            its content without our explicit written consent.
                          </div>
                          <div className="font-bold">5. Indemnification</div>
                          <div className="pl-6">
                            5.1. Users agree to indemnify and hold us harmless
                            from any claims, damages, liabilities, or expenses
                            arising from their use of the platform, violation of
                            these terms, or infringement of any rights of third
                            parties.
                          </div>
                          <div className="font-bold">
                            6. Amendments to the Terms
                          </div>
                          <div className="pl-6">
                            6.1. We reserve the right to modify these Terms and
                            Conditions at any time. Updated versions will be
                            posted on the platform, and users will be notified
                            of significant changes.
                          </div>
                          <div className="pl-6">
                            6.2. Continued use of the platform after changes to
                            the Terms implies acceptance of the modified terms.
                          </div>
                          <div className="font-bold">7. Termination</div>
                          <div className="pl-6">
                            7.1. Users may terminate their account at any time
                            by following the account closure procedures
                            available on the platform.
                          </div>
                          <div className="pl-6">
                            7.2. We reserve the right to terminate or suspend
                            user accounts if they violate these Terms and
                            Conditions or for any other reason deemed necessary.
                          </div>
                          <div className="font-bold">8. Governing Law</div>
                          <div className="pl-6">
                            8.1. These Terms and Conditions shall be governed by
                            and construed in accordance with the laws of the
                            Republic of the Philippines, without regard to its
                            conflicts of law principles.
                          </div>
                          <div className="pl-6">
                            By using our platform, you acknowledge that you have
                            read, understood, and agree to be bound by these
                            Terms and Conditions. If you have any questions or
                            concerns, please contact us at [contact email/phone
                            number].
                          </div>
                        </div>
                        <div className="mt-[25px] flex justify-end">
                          <Dialog.Close asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none shadow-[0_0_0_2px]">
                              Close
                            </button>
                          </Dialog.Close>
                        </div>
                        <Dialog.Close asChild>
                          <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                          >
                            <Cross2Icon />
                          </button>
                        </Dialog.Close>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
  );
};

export default TermsConditions;
