import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const ZBD_API_KEY = "b7Ya3s2JZKZcX1f2Dqof8wjKT22RuWr8";

const zbdSend = async (_request: Request): Promise<Response> => {
  const res = await fetch("https://api.zebedee.io/v0/ln-address/send-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": `${ZBD_API_KEY}`,
    },
    body: JSON.stringify({
      lnAddress: 'andre@zbd.gg', // Who is the recipient of the payment?
      amount: '100000', // 100 satoshis (100,000 msats) -- ~$0.03
      comment: 'Money at internet speed', // What is this payment for?
    }),
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

serve(zbdSend);
