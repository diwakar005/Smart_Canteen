const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOrderStatusEmail = async (toEmail, status, orderDetails) => {
    if (!toEmail) {
        console.log("No email provided for notification");
        return;
    }

    const subject = `Order Update: ${status.toUpperCase()} - Smart Canteen`;
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #ea580c;">Order Status Update</h2>
            <p>Hello,</p>
            <p>Your order (ID: <strong>${orderDetails.transactionId || orderDetails._id}</strong>) status has been updated to:</p>
            <h3 style="color: #2563eb; background: #eff6ff; display: inline-block; padding: 5px 10px; border-radius: 5px;">
                ${status.toUpperCase()}
            </h3>
            
            <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
                <h4>Order Summary:</h4>
                <ul>
                    ${orderDetails.items.map(item => `<li>${item.quantity}x ${item.name}</li>`).join('')}
                </ul>
                <p><strong>Total: ₹${orderDetails.totalAmount}</strong></p>
            </div>

            <p style="margin-top: 20px; font-size: 12px; color: #666;">
                Thank you for using Smart Canteen.<br>
                This is an automated message, please do not reply.
            </p>
        </div>
    `;

    try {
        const info = await transporter.sendMail({
            from: `"Smart Canteen Admin" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: subject,
            html: html
        });
        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { sendOrderStatusEmail };
