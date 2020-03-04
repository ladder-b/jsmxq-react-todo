Todo app using React and messaging library Jsmxq.
### Installation

```
git clone https://github.com/ladder-b/jsmxq-react-demo.git
npm install
npm run start
```

Now point your browser to localhost:3000

[Click here to read more about jsmxq](https://github.com/ladder-b/jsmxq)<br>
[Click here to read more about jsmxq-react](https://github.com/ladder-b/jsmxq-react) 

### Next
This example is traditional todos app where data is passed as props from top to lower components.
Application can be designed in such a way that lower components and data model is made message aware.
And data model directly emits messages in response to any change.
Changes to data model can happen by user action or as result of a fetch data from server. Pl note single source of truth is data model.
