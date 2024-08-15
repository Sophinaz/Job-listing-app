<h1>Description</h1>

The page initially goes to the home page and checks if there is an open session or an access token that tells if the user has logged in. If the user hasnt logged in, it redirects to the sign up page where the user has options to sign up whether with google account or with email.


If the user chooses to sign up with his google account, the app will redirect to this page:



But if the user chose to sign up with his email:


The page goes to the verify email page, where the user will be asked for their otp number to verify their email account:


If the user chose either one of them and the sign up was successful the page goes to the home page to see the job lists page.


The user also has also an option to login:


If the user logged in, He will be redirected to the home page:




From their the user can also access the details page about a specific job from the job lists on the home page:









This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

