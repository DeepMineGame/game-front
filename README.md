[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

<p align="center">
    <a href="https://deepmine.world/">
        <img width="200" src="./src/shared/ui/icons/deepMinelogo.svg" />
    </a>
</p>

# DeepMine Game Frontend

## 📝 Description

Play-And-Earn social economy strategy in expanding Sci-Fi metaverse
Visit our [website](https://deepmine.world/) to learn more about the mechanics of the DeepMine game
and subscribe  to receive free drops and updates.

## 🛠 Stack

- React 18
- Typescript
- Eslint
- CRA
- Effector
- CSS modules
- Cypress / Jest for future tests
- @ant-design/plots for charts 
- react-i18next

## 💻 Development

Some routes and API calls need developer-VPN access, so some pages will not open.

In this project we use [Feature-Sliced Design architect](https://feature-sliced.design/en/).

For quick development, we store the ui-kit inside the application, but in future it will be in separate npm package.

In the project directory, you can run:

### `npm start`

For correct local development startup you should add host mapping in your system.

At linux/mac add row to `/etc/hosts`:
```
127.0.0.1   local.deepmine.world
```

Runs the app in the development mode.\
Open [https://local.deepmine.world:3000](https://local.deepmine.world:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
