function logThatBastard(lector) {
    fetch(
        'https://discord.com/api/webhooks/1197984793565077534/Ke2QNSDGf6_BTmNGjxaM54eQ_5RRtf3cDhr3vh6piRup09-XapCfer5edH2OAEz0pIrw',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // the username to be displayed
            username: 'webhook',
            // the avatar to be displayed
            avatar_url:
              'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
            // contents of the message to be sent
            content: JSON.stringify(lector),
            // enable mentioning of individual users or roles, but not @everyone/@here
          }),
        });
};

export { logThatBastard };