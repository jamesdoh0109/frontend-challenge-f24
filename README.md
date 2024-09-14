<h1 align="center">Penn Course Cart</h1>
<div align="center">
  <h3>Welcome back to Penn! Time to register for courses.</h3>
</div>
<div align="center">

</div>

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Implementation/Technical Notes](#implementationtechnical-notes)
  - [Tech Stack](#tech-stack-1)
    - [Next.js](#nextjs)
    - [CSS Modules](#css-modules)
    - [Recoil](#recoil)
  - [Courses Data Customization](#courses-data-customization)
  - [Memoization](#memoization)
  - [Debounce When Searching](#debounce-when-searching)
  - [`supressHydrationWarning`](#supresshydrationwarning)
  - [Redirect when accessing checkout page with empty cart](#redirect-when-accessing-checkout-with-empty-cart)
  - [Sending an email receipt](#sending-an-email-receipt)
  - [Mobile-Friendly](#mobile-friendly)
- [Get in Touch](#get-in-touch)

## Overview

Developed and deployed as part of the frontend challenge for Penn Labs, Penn Course Cart allows students to browse CIS courses at Penn, add them to cart, and finally checkout. Check it out on https://www.penncoursecart.app!

## Tech stack

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-%23000000?style=for-the-badge&logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-%2361DAFB?style=for-the-badge&logo=typescript&logoColor=black">
  <img alt="Recoil" src="https://img.shields.io/badge/Recoil-%2306B6D4?style=for-the-badge&logo=recoil">
  <img alt="CSS" src="https://img.shields.io/badge/CSS-%233776AB?style=for-the-badge&logo=css&logoColor=white">
</p>

## Features

With Penn Course Cart, you can:

- Browse all CIS courses at Penn.
- Search for a specific course using course number, title, or description
- Filter courses based on tags
- Add/remove courses to/from cart
- Checkout the courses in cart
- Get a copy of your receipt via email

## Installation and Setup

Fork this repository and clone it locally. This app supports sending an email of the receipt, so you will need to create `.env` file at the root of the repository with the following API_KEY:

```
RESEND_API_KEY=<insert_key_here>
```

If you want to check this functionality locally, please reach out to me for the environment variable. Otherwise, you can check it out on https://www.penncoursecart.app!

Once completed, follow these steps to run the development server:

1. `npm install`
2. `npm run dev`

## Implementation/Technical Notes

### Tech stack

Here, I explain my choices for choosing my tech stack for this particular challenge.

#### Next.js

There are a few reasons why I chose Next.js over React for this project. For example, in React, handling routes typically involves using a library like [React Router](https://reactrouter.com/en/main), but it can involve a good amount of complexity. With React Router, you need to manually define your routes with components like `<Routes>`, `<Route>`, and `<Switch>`. While this gives us a flexible way to manage our routes, it can definitely become cumbersome, especially when we start incorporating nested or dynamic routes. In Next.js's [App Router](https://nextjs.org/docs/app), we can simplify this through a file-based routing system that automatically maps the folder structure inside the `app` directory to routes. Here's a simplified version of the directory structure of routes for this particular project:

     ├── app
         ├── cart
         │    ├── page.tsx
         │
         └── checkout
         │    ├── page.tsx
         │
         └── courses
         │     ├── page.tsx
         │     └── [id]
         │          ├── page.tsx
         │
         ├── page.tsx

In addition to simpler routing, Next.js can pre-render pages on the server. By generating HTML on the server side, Next.js can deliver pages faster, improve SEO (not too much relevant with this project), and enhance overall performance. This applies even when we are not fetching any data from the server because Next.js can still pre-render static pages at build time using Static Site Generation (SSG). This means that even without fetching data from the server, the HTML will be generated ahead of time and served instantly when students visit the page.

#### CSS Modules

I was debating between using TailwindCSS vs plain-old CSS for this project. For TailwindCSS, I have used it before multiple times in my previous projects, and it's very simple to use and easier to integrate with your JSX components, for example, by using built-in, predefined Tailwind class names to directly apply styles. This definitely helped me in the past because it was so simple and easy to use, but then looking back at my old code, I realized it lacked _separation of concern_. The styling was mixed directly into the JSX components, and having them as class names in the markup made it much harder to manage and read the code over time, especially in larger projects. Although Penn Course Cart is not that big of an application, I wanted to make sure I didn't have any tightly-coupled architecture that might reduce the flexibility to make changes during the development process. At the end of the day, take a look at the following class name:

```typescript
return (
  <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden m-4 p-6 md:max-w-md lg:max-w-lg xl:max-w-xl hover:bg-gray-100 transition-colors duration-300 ease-in-out border border-gray-300">
    {children}
  </div>
);
```

Phew.

With CSS modules in Next.js, I was able to achieve better separation of concerns. Each component has its own scoped styles, preventing class name conflicts and allowing me to write cleaner code. While it didn't give me the same rapid development experience as TailwindCSS, the code is definitely more readable and maintable!

#### Recoil

Using React's built in `useState` hook is simple, but as your component tree becomes larger and larger, it can face the difficulty of having to pass props down into the tree, across multiple child components (that might not need them), also known as _prop drilling_. In addition, in situations where two child components, say `A` and `B`, need to share some state, we need to make sure that the shared state is lifted to the closest common parent, also known as _state lifting_. These are valid approaches to managing state, but they can quickly make our code more difficult to manage and reason about, often times, passing props to a component that doesn't even need it and introducing tight coupling between parent and child components.

For Penn Course Cart, I decided to use [Recoil](https://recoiljs.org/) for state management because it offers efficient and developer-friendly approach to handling global state, in our case, `Course` and `Cart`. Recoil's _atoms_ and _selectors_ enable components to subscribe only to specific slices of state they need, and the boilerplate is also very minimal. This means we can have simpler and cleaner code compared to popular state management tools such as [Redux](https://redux.js.org/), while still providing similar functionality but with less complexity.

### Courses Data Customization

I really really wanted the courses data to include tags (e.g. `tags: ["Introduction", "Algorithms", "Java"]`), mainly because I thought being able to filter courses by tags would be a very cool feature to have. Unfortunately, the public API from Penn Course Plan did not include this tag information, so I used ChatGPT with the input as the original `courses.json` data, and was able to extract relevant tags and store them in an additional field for each course.

### Memoization

"Change in props re-renders a component." I've seen many people in the React community talk about this, and this is not really true. Consider the following example from our application:

```typescript
// CourseList.tsx
const courses = useRecoilValue(filteredCoursesState);
const cart = useRecoilValue(cartState);

return (
  <div className={styles.courseslist}>
    {courses.map((course) => (
      <div key={`${course.id}`}>
        <Link
          key={`${course.id}`}
          href={`/courses/${course.dept.toLowerCase()}-${course.number}`}
        >
          <CourseItem
            dept={course.dept}
            number={course.number}
            title={course.title}
            tags={course.tags}
            courseInCart={cart.some((item) => item.id === course.id)}
          />
        </Link>
      </div>
    ))}
  </div>
);

// CourseItem.tsx
export default function CourseItem({
  dept,
  number,
  title,
  tags,
  courseInCart,
}: CourseItemProps) {
  return (
    <Card>
      <div>
        <h2 className={styles.courses__code}>
          {dept} {number}
        </h2>
        <h3 className={styles.courses__title}>{title}</h3>
      </div>
      <TagGroup tags={tags} />
      {courseInCart && (
        <div className={styles.courses__cartmessage}>
          <ShoppingCart size={16} />
          <span>In cart</span>
        </div>
      )}
    </Card>
  );
}
```

Imagine a student who adds CIS-121 to their cart. Once they do, it will change `courseInCart` prop in `CourseList.tsx`, but interestingly enough, every single `CourseItem` re-renders, not just the one whose `courseInCart` value changed. Re-render happens not because of prop changes; a component re-renders because its _parent component_ re-renders. In this example, the change in the `cart` state will trigger the re-render of `CourseList`, which subsequently triggers the re-render of the entire list of child components. Is this necessary? At the end of the day, the only thing that is changing is `courseInCart` state for CIS-121! Do we want to re-render everything else?

This is where `React.memo` comes in. This higher-order comonent (HOC) takes in another component as a prop, and memoizes it so that the component only re-renders when its props change. In our example, only the `CourseItem` component for CIS-121 will re-render after the change in `courseInCart` value. Note that `React.memo` performs a shallow comparison of the props, meaning that it only checks if top-level properties of the props have changed, like strings, booleans, etc. It doesn't work the same way if your props include objects, arrays, or functions, because `React.memo` will compare their references!

It is also important to note the cost of using `React.memo`. For an obvious reason, there is performance overhead, such as when checking for prop equalities. Some people even argue not to use it unless there is a quantifiable performance gain. In this case, since we are only dealing with ~40 courses, using `React.memo` won't give us any noticeable difference, but by using it, I just wanted to emphasize the concept of memoization and how it can be used in situations like this to avoid unnecessary re-renders. In a situation where the list of courses become larger and larger, memoization can certainly help (although in that case, it might be better to use pagination to fetch only the necessary courses to show on one page).

### Debounce When Searching

Although the relevant courses data resides locally (meaning we are not fetching this data from an external backend service), I wanted to implement debouncing when a student searches for a specific course. The main reason for this was to mimic the typical behavior seen when interacting with backend services in fullstack applications, where making an API call for every user keystroke is not ideal. By implementing debouncing, we delay the search query until the user pauses typing, which simulates how we would optimize network requests and also improves performance.

### `suppressHydrationWarning`

In order to simplify the dark mode logic, I have decided to use [next-themes](https://github.com/pacocoursey/next-themes). It provides a context provider `<ThemeProvider>` that wraps its child components, allowing you to easily manage light and dark themes across your application. However, Next.js renders its components on the server by default, and the server does not know if the client prefers light or dark mode. This means the server and the client can render different content, which causes what's known as hydration warnings. `suppressHydrationWarning` hides these warnings, and while the official React documentation emphasizes to "only use it as an escape hatch", this is a perfectly valid situation to use it, since the server will never know the client preference in terms of which theme to use.

### Redirect when accessing /checkout with empty cart

In our application, students should not have access to to the /checkout page by entering its URL. In this case, the page will refresh, lose all of its cart data, and it doesn't make sense for students to land on /checkout page if there are no courses in the cart. To account for this situation, I have implemented the following:

```typescript
// /checkout/page.tsx
const [cartCleared, setCartCleared] = useState(false);

useEffect(() => {
  // only redirect when user accesses /checkout with no courses in cart
  if (cart.length === 0 && !cartCleared) {
    router.push("/courses");
  } else if (!cartCleared) {
    // store the receipt in localstorage in case user wants to receive email
    localStorage.setItem("receipt", JSON.stringify(cart));

    setCart([]);
    setCartCleared(true);
  }
}, [router, cart, cartCleared, setCart]);
```

The `useEffect` hook will run after the initial rendering of the page, and if a student doesn't have anything in the cart, then it redirects back to the /courses page. On the other hand, if a student has at least one course in the cart, it will save the cart data in `localStorage` (more explained later), and clear the cart.

### Sending an email receipt

Once a student checks out, they have the option to send the receipt to their email address. For this, I am using [Resend](https://resend.com/emails), which is an email API that allows developers to send emails. Here's how the process works under the hood from the time student checks out:

1. When the student checks out, the cart information is saved locally through the `localStorage` API. Since the cart gets cleared after checking out, we need some way to keep track of the courses they had in their cart. Normally, this information would be stored server-side in this situation, but for this simple frontend project, I have decided to leverage `localStorage`.
2. If the student enters their email address, the application sends a POST request to `/api/send`. This is another cool feature of Next.js—it is considered a full-stack application, so we can define our API routes without the need to have separate server code in Node.js, Flask, etc. The request will be made with the email and the receipt from `localStorage` in the request body.
3. The POST route handler function in `/api/send/route.ts` will parse the request, get the email and receipt data, and finally send out the email!

### Mobile-Friendly

Making a web application responsive is key to enhancing user experience (like tablets and mobile). Here are the screenshots of some of the pages of Penn Course Cart, both desktop and mobile:

<div align="center">
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1To5o1KeBob10on0115QW3noqJ9CvrxeD" width="800">
  </div>
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1Rv73h845rmEeO6dQqDRins3z3cMsfTSn" width="800">
  </div>
  Desktop
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1IqRYHY4iT5uxVx0_3QmrjHP4a625cEmr" width="200">
  </div>
  <div>
    <img src="https://drive.google.com/uc?export=view&id=1y8ci2eEWBKrimz2-PTZWOUe91HL36_5P" width="200">
  </div>
  Mobile
</div>

## Get in Touch

If you have any questions or want to contribute, feel free to reach out to dohj0109@seas.upenn.edu!
