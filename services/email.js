Sharer.register('email', {
  shareUrl: 'mailto:',
  params: {
    to: 'to',
    subject: 'subject', // defaults to page title
    body: 'body',       // defaults to "title + url"
  },
});
