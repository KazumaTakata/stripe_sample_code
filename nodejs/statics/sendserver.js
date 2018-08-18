let sendrequest = async (email, token) => {
  const rawResponse = await fetch("/charge", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stripeEmail: email, stripeToken: token }),
  });

  window.location.href = "http://stackoverflow.com";
};
