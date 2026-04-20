'use client'

import { useStore } from '@/store/use-store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export function PrivacyModal() {
  const { privacyOpen, setPrivacyOpen } = useStore()

  return (
    <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl gradient-text">
            Privacy Policy
          </DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6 pb-4 text-sm leading-relaxed text-muted-foreground">
            {/* 1. Introduction */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                1. Introduction
              </h3>
              <p>
                Natraj Electrical Control Panel (&quot;the Company&quot;, &quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;) is committed to protecting your privacy and personal
                information. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website or engage our services.
              </p>
            </section>

            <Separator />

            {/* 2. Data Collection */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                2. Information We Collect
              </h3>
              <p className="mb-2">
                We may collect the following types of personal information:
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <strong className="text-foreground/80">Contact Information:</strong> Name,
                  email address, phone number, and mailing address when you
                  submit a contact form or request a quotation.
                </li>
                <li>
                  <strong className="text-foreground/80">Business Information:</strong> Company
                  name, GST number, and business address for commercial
                  inquiries and orders.
                </li>
                <li>
                  <strong className="text-foreground/80">Technical Information:</strong> IP
                  address, browser type, device information, operating system,
                  and browsing patterns collected automatically through cookies
                  and similar technologies.
                </li>
                <li>
                  <strong className="text-foreground/80">Usage Data:</strong> Pages visited,
                  time spent on pages, click patterns, and referring URLs.
                </li>
              </ul>
            </section>

            <Separator />

            {/* 3. How We Use Your Information */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                3. How We Use Your Information
              </h3>
              <p className="mb-2">
                We use the information collected for the following purposes:
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>To respond to your inquiries and provide customer support.</li>
                <li>To process orders, quotations, and transactions.</li>
                <li>To send product updates, promotional offers, and newsletters (with your consent).</li>
                <li>To improve our website, products, and services.</li>
                <li>To comply with legal obligations and enforce our terms.</li>
                <li>To detect, prevent, and address technical issues or fraudulent activities.</li>
              </ul>
            </section>

            <Separator />

            {/* 4. Cookies */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                4. Cookies &amp; Tracking Technologies
              </h3>
              <p className="mb-2">
                Our website uses cookies and similar tracking technologies to
                enhance your browsing experience. Cookies are small data files
                stored on your device that help us:
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Remember your preferences and settings.</li>
                <li>Understand how you use our website.</li>
                <li>Provide personalized content and recommendations.</li>
                <li>Analyze website traffic and performance.</li>
              </ul>
              <p className="mt-2">
                You can control cookie preferences through your browser
                settings. Disabling cookies may affect certain functionalities
                of the website.
              </p>
            </section>

            <Separator />

            {/* 5. Third-Party Sharing */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                5. Third-Party Sharing
              </h3>
              <p className="mb-2">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <strong className="text-foreground/80">Service Providers:</strong> Trusted
                  third parties who assist us in operating our website,
                  processing payments, or delivering orders.
                </li>
                <li>
                  <strong className="text-foreground/80">Legal Requirements:</strong> When
                  required by law, regulation, legal process, or governmental
                  request.
                </li>
                <li>
                  <strong className="text-foreground/80">Business Transfers:</strong> In
                  connection with any merger, acquisition, or sale of company
                  assets.
                </li>
                <li>
                  <strong className="text-foreground/80">Analytics:</strong> Anonymized data
                  with analytics tools (e.g., Google Analytics) to improve our
                  services.
                </li>
              </ul>
            </section>

            <Separator />

            {/* 6. Data Security */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                6. Data Security
              </h3>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no
                method of transmission over the internet or electronic storage
                is 100% secure. While we strive to use commercially acceptable
                means to protect your information, we cannot guarantee absolute
                security.
              </p>
            </section>

            <Separator />

            {/* 7. Data Retention */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                7. Data Retention
              </h3>
              <p>
                We retain your personal information only for as long as
                necessary to fulfill the purposes for which it was collected,
                including satisfying any legal, accounting, or reporting
                requirements. Contact form submissions and inquiry records are
                retained for up to 2 years from the date of last interaction.
              </p>
            </section>

            <Separator />

            {/* 8. User Rights */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                8. Your Rights
              </h3>
              <p className="mb-2">You have the right to:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Access and obtain a copy of your personal information.</li>
                <li>Request correction of inaccurate or incomplete data.</li>
                <li>Request deletion of your personal information (subject to legal obligations).</li>
                <li>Withdraw consent for marketing communications at any time.</li>
                <li>Lodge a complaint with the relevant data protection authority.</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please contact us using the
                details provided below.
              </p>
            </section>

            <Separator />

            {/* 9. Children's Privacy */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                9. Children&apos;s Privacy
              </h3>
              <p>
                Our website and services are not directed to individuals under
                the age of 18. We do not knowingly collect personal information
                from children. If you believe we have inadvertently collected
                information from a minor, please contact us immediately and we
                will take steps to delete such information.
              </p>
            </section>

            <Separator />

            {/* 10. Changes to This Policy */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                10. Changes to This Privacy Policy
              </h3>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or applicable laws. Any changes will
                be posted on this page with an updated effective date. We
                encourage you to review this policy periodically to stay
                informed about how we protect your information.
              </p>
            </section>

            <Separator />

            {/* 11. Contact */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                11. Contact Us
              </h3>
              <p className="mb-2">
                If you have any questions or concerns about this Privacy
                Policy, please contact us at:
              </p>
              <p className="text-foreground/70">
                Natraj Electrical Control Panel
                <br />
                1547/3, Jai Hind Building, Bhagirath Place, Delhi-6
                <br />
                Phone: 011-23873532, 9868225911
                <br />
                Email: natrajenterprises14@gmail.com
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
