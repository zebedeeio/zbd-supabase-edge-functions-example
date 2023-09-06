import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const ZBD_API_KEY = "b7Ya3s2JZKZcX1f2Dqof8wjKT22RuWr8";

const zbdReceive = async (_request: Request): Promise<Response> => {
  const res = await fetch("https://api.zebedee.io/v0/charges", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": `${ZBD_API_KEY}`,
    },
    body: JSON.stringify({
      amount: '100000', // 100 satoshis (100,000 msats) -- ~$0.03
      description: 'Money at internet speed', // What is this payment request for?
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

serve(zbdReceive);
