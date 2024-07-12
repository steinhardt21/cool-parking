
## Cool Parking
This project was developed as part of a recruitment process, which involved creating three web pages that consume real data from an open API regarding parking services and bike-sharing in the Belgian city of Ghent.

(Short presentation of the project done via Loom)[https://www.loom.com/share/5d2107156ec645c5b96cbb2fdb09cf49?sid=e1deabc6-92d4-4c05-929f-278b85e54746]

### Relevant piece of software used in the development
- [NextJS](https://nextjs.org/): in particular with RSC
- [Tailwind](https://tailwindcss.com)
- [Zod](https://zod.dev/): TypeScript-first schema validation with static type inference.
- [shadcn/ui](https://ui.shadcn.com/): Beautifully designed components for fast development for projects like this. At its core it has Radix for most of the components.
- [@t3-oss/env-core](https://env.t3.gg/) : Framework agnostic validation for type-safe environment variables.
- [next-view-transitions](https://github.com/shuding/next-view-transitions): Use View Transitions API in Next.js App Router.
- 
## Technical challengies
My goal for this project was to develop everything using RSC. The primary challenge was finding a way to update the data periodically on the client side by sending updates.
The solution I discovered was largely inspired by this [article](https://buildui.com/recipes/refresh-react-server-component-on-focus) by [BuildUI](https://buildui.com/), which suggests using a combination of server actions and client-side components.

Additionally, I experimented with the recently enhanced [View Transition API](https://developer.chrome.com/docs/web-platform/view-transitions) that has been improved by the Chrome team.

### Page  `/`
![image](https://github.com/user-attachments/assets/9d43bdfc-276e-4dff-b524-0cd3f1842a9e)

### Page  `/bikes`
![image](https://github.com/user-attachments/assets/e24893b8-5a87-44d5-9e20-2ef291c3d2a2)

### Page  `/parkings`
![image](https://github.com/user-attachments/assets/42e0cdc9-8b6d-4e29-887b-8f956ea92ce0)

### Page  `/parkings/:id`
![image](https://github.com/user-attachments/assets/aacd57c0-3c8d-45a2-8b01-6f24e7de8a7f)

## Download locally and run
After you set the .env then run the development server:

```bash
pnpm dev
```

