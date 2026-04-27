interface BookingConfirmationInput {
  bookingId: string;
  firstName: string;
  lastName: string;
  email: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  bikeCount: number;
  totalPrice: number;
}

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

const SENDER = { name: "Vintage Rides USA", email: "bookings@vintagerides.com" };
const REPLY_TO = { name: "Vintage Rides USA", email: "wendy@vintagerides.travel" };

function fmtDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
}

function fmtMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export async function sendBookingConfirmation(b: BookingConfirmationInput): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY missing — skipping booking confirmation email");
    return;
  }

  const subject = `Your Vintage Rides USA booking is confirmed — ${b.bookingId}`;
  const html = renderHtml(b);
  const text = renderText(b);

  const res = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: SENDER,
      replyTo: REPLY_TO,
      to: [{ email: b.email, name: `${b.firstName} ${b.lastName}`.trim() }],
      subject,
      htmlContent: html,
      textContent: text,
      tags: ["booking-confirmation", "vintage-rides-usa"],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Brevo send failed ${res.status}: ${body}`);
  }
}

function renderHtml(b: BookingConfirmationInput): string {
  const bikeWord = b.bikeCount === 1 ? "bike" : "bikes";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Booking confirmed</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2a2a28;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f1ea;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #e8e6e0;">
          <tr>
            <td style="background:#111110;padding:32px 32px 28px;text-align:left;">
              <div style="font-size:11px;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;color:#c8a45a;margin-bottom:10px;">Booking confirmed</div>
              <div style="color:#ffffff;font-size:14px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">VINTAGE RIDES <span style="color:#c8a45a;font-weight:400;letter-spacing:0.12em;">USA</span></div>
            </td>
          </tr>

          <tr>
            <td style="padding:36px 32px 8px;">
              <h1 style="margin:0 0 12px;font-size:26px;font-weight:300;line-height:1.25;color:#111110;">Hi ${escapeHtml(b.firstName)}, you're booked.</h1>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.55;color:#5b5b58;">Thanks for choosing Vintage Rides USA. Your Royal Enfield Himalayan 450 ${b.bikeCount === 1 ? "is" : "are"} reserved. Pickup details and route suggestions will land in your inbox 7 days before your start date.</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e8e6e0;border-radius:2px;">
                <tr>
                  <td style="padding:18px 20px;border-bottom:1px solid #e8e6e0;">
                    <div style="font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#8a8a86;margin-bottom:4px;">Booking reference</div>
                    <div style="font-size:16px;font-family:'SF Mono',Menlo,Consolas,monospace;color:#111110;">${escapeHtml(b.bookingId)}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:18px 20px;border-bottom:1px solid #e8e6e0;border-right:1px solid #e8e6e0;width:50%;">
                          <div style="font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#8a8a86;margin-bottom:4px;">Pickup</div>
                          <div style="font-size:15px;color:#111110;">${fmtDate(b.startDate)}</div>
                        </td>
                        <td style="padding:18px 20px;border-bottom:1px solid #e8e6e0;width:50%;">
                          <div style="font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#8a8a86;margin-bottom:4px;">Return</div>
                          <div style="font-size:15px;color:#111110;">${fmtDate(b.endDate)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:18px 20px;border-bottom:1px solid #e8e6e0;border-right:1px solid #e8e6e0;width:50%;">
                          <div style="font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#8a8a86;margin-bottom:4px;">Duration</div>
                          <div style="font-size:15px;color:#111110;">${b.totalDays} ${b.totalDays === 1 ? "day" : "days"}</div>
                        </td>
                        <td style="padding:18px 20px;border-bottom:1px solid #e8e6e0;width:50%;">
                          <div style="font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#8a8a86;margin-bottom:4px;">Bikes</div>
                          <div style="font-size:15px;color:#111110;">${b.bikeCount} ${bikeWord}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 20px;background:#faf8f3;">
                    <div style="font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#8a8a86;margin-bottom:4px;">Total paid</div>
                    <div style="font-size:22px;font-weight:300;color:#111110;">${fmtMoney(b.totalPrice)}</div>
                    <div style="font-size:11px;color:#8a8a86;margin-top:2px;">Tax included · paid via Stripe</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 32px 8px;">
              <div style="font-size:11px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#c8a45a;margin-bottom:14px;">What's next</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${[
                  "Save this email — your booking reference is your check-in code.",
                  "We'll send pickup location and instructions 7 days before your start date.",
                  "Want GPX routes for the Black Hills, Badlands or Needles Highway? Just reply.",
                ]
                  .map(
                    (line, i) => `
                <tr>
                  <td style="padding:6px 0;font-size:14px;line-height:1.5;color:#2a2a28;">
                    <span style="color:#c8a45a;font-weight:600;margin-right:8px;">${i + 1}.</span> ${escapeHtml(line)}
                  </td>
                </tr>`
                  )
                  .join("")}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 36px;">
              <p style="margin:0;font-size:13px;line-height:1.55;color:#5b5b58;">Questions? Just hit reply — your message will reach the team in Rapid City directly.</p>
            </td>
          </tr>

          <tr>
            <td style="background:#111110;padding:22px 32px;text-align:left;">
              <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#8a8a86;margin-bottom:6px;">Vintage Rides USA</div>
              <div style="font-size:12px;color:#8a8a86;line-height:1.55;">A Vintage Rides company · Royal Enfield Himalayan 450 rentals · Rapid City, SD<br /><a href="https://www.vintageridesusa.com" style="color:#c8a45a;text-decoration:none;">vintageridesusa.com</a></div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderText(b: BookingConfirmationInput): string {
  const bikeWord = b.bikeCount === 1 ? "bike" : "bikes";
  return [
    `BOOKING CONFIRMED — Vintage Rides USA`,
    ``,
    `Hi ${b.firstName},`,
    ``,
    `Thanks for choosing Vintage Rides USA. Your Royal Enfield Himalayan 450 ${b.bikeCount === 1 ? "is" : "are"} reserved.`,
    ``,
    `Booking reference: ${b.bookingId}`,
    `Pickup:   ${fmtDate(b.startDate)}`,
    `Return:   ${fmtDate(b.endDate)}`,
    `Duration: ${b.totalDays} ${b.totalDays === 1 ? "day" : "days"}`,
    `Bikes:    ${b.bikeCount} ${bikeWord}`,
    `Total:    ${fmtMoney(b.totalPrice)} (tax included, paid via Stripe)`,
    ``,
    `What's next:`,
    `1. Save this email — your booking reference is your check-in code.`,
    `2. We'll send pickup location and instructions 7 days before your start date.`,
    `3. Want GPX routes for the Black Hills, Badlands or Needles Highway? Just reply.`,
    ``,
    `Questions? Reply to this email.`,
    ``,
    `Vintage Rides USA — A Vintage Rides company`,
    `Royal Enfield Himalayan 450 rentals — Rapid City, SD`,
    `https://www.vintageridesusa.com`,
  ].join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
