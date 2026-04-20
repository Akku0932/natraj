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

export function TermsModal() {
  const { termsOpen, setTermsOpen } = useStore()

  return (
    <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl gradient-text">
            Terms &amp; Conditions
          </DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6 pb-4 text-sm leading-relaxed text-muted-foreground">
            {/* 1. General */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                1. General Terms
              </h3>
              <p>
                These Terms and Conditions govern your use of the website and
                services provided by Natraj Electrical Control Panel (&quot;the Company&quot;),
                located at 1547/3, Jai Hind Building, Bhagirath Place, Delhi-6.
                By accessing this website or engaging our services, you agree to
                be bound by these terms in their entirety.
              </p>
            </section>

            <Separator />

            {/* 2. Products & Services */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                2. Products &amp; Services
              </h3>
              <p className="mb-2">
                Natraj Electrical Control Panel supplies and distributes electrical control
                panels, automatic changeovers, busbar systems, power factor
                correction panels, water level controllers, temperature control
                panels, digital measuring instruments, air break starters, AC
                distribution panels, oil immersed starters, sequence timer
                panels, AMF panels, and solar panels.
              </p>
              <p>
                All product specifications, images, and descriptions on this
                website are provided for informational purposes. The Company
                reserves the right to modify product specifications without
                prior notice. Actual products may vary slightly from
                representations shown herein.
              </p>
            </section>

            <Separator />

            {/* 3. Pricing */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                3. Pricing &amp; Payment
              </h3>
              <p className="mb-2">
                All prices displayed are in Indian Rupees (INR) and are
                exclusive of applicable taxes, unless stated otherwise. Prices
                are subject to change without prior notice. A valid quotation
                provided by the Company shall be binding for a period of 30
                days from the date of issue, unless otherwise specified.
              </p>
              <p>
                Payment terms shall be as agreed upon between the parties at
                the time of order confirmation. The Company reserves the right
                to require advance payment for custom or large-scale orders.
              </p>
            </section>

            <Separator />

            {/* 4. Warranty */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                4. Warranty
              </h3>
              <p className="mb-2">
                All electrical panels and equipment supplied by Natraj
                Electricals are warranted against defects and faulty workmanship
                for a period of 12 months from the date of dispatch, subject to
                the following conditions:
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>The product has been used in accordance with the intended purpose and operating conditions specified.</li>
                <li>The product has not been subject to unauthorized modification, repair, or alteration.</li>
                <li>Any damage is not caused by misuse, negligence, accident, or natural calamity.</li>
                <li>The warranty covers only the replacement or repair of defective components and does not extend to consequential damages.</li>
              </ul>
            </section>

            <Separator />

            {/* 5. Liability */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                5. Limitation of Liability
              </h3>
              <p>
                The Company shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising out of or
                related to the use of our products or services, including but
                not limited to loss of profits, data, business opportunities, or
                goodwill. Our total liability shall not exceed the purchase
                price of the product or service in question.
              </p>
            </section>

            <Separator />

            {/* 6. Shipping & Delivery */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                6. Shipping &amp; Delivery
              </h3>
              <p className="mb-2">
                Delivery timelines are estimates and may vary based on order
                complexity, quantity, and logistics. The Company shall make
                reasonable efforts to deliver products within the agreed
                timeframe. Risk of damage or loss transfers to the buyer upon
                handover to the shipping carrier.
              </p>
              <p>
                Shipping charges are additional and shall be borne by the
                buyer unless expressly included in the order confirmation. The
                Company is not responsible for delays caused by circumstances
                beyond its reasonable control, including but not limited to
                natural disasters, strikes, or government actions.
              </p>
            </section>

            <Separator />

            {/* 7. Returns */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                7. Returns &amp; Cancellations
              </h3>
              <p>
                Custom-configured panels and sourced-to-order products are
                non-returnable and non-cancellable once procurement has
                commenced. Standard products may be eligible for return within
                7 days of delivery, provided they are in original, unused
                condition and in their original packaging. Return shipping
                costs shall be borne by the buyer. A restocking fee of up to
                15% may apply at the Company&apos;s discretion.
              </p>
            </section>

            <Separator />

            {/* 8. Intellectual Property */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                8. Intellectual Property
              </h3>
              <p>
                All content on this website, including but not limited to text,
                graphics, logos, images, product designs, and software, is the
                intellectual property of Natraj Electrical Control Panel and is protected by
                applicable Indian and international intellectual property laws.
                Unauthorized reproduction, distribution, or use of any content
                is strictly prohibited.
              </p>
            </section>

            <Separator />

            {/* 9. Governing Law */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                9. Governing Law
              </h3>
              <p>
                These Terms and Conditions shall be governed by and construed
                in accordance with the laws of India. Any disputes arising
                out of or in connection with these terms shall be subject to
                the exclusive jurisdiction of the courts in Delhi, India.
              </p>
            </section>

            <Separator />

            {/* 10. Contact */}
            <section>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                10. Contact Information
              </h3>
              <p>
                For any queries regarding these Terms and Conditions, please
                contact us at:
              </p>
              <p className="mt-2 text-foreground/70">
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
