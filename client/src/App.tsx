import './App.css';
import {FetchPostListView} from "./components/PostListView";
import {Account} from "./components/Account/Account.tsx";

function App() {
    return (
        <div className="app">
            <Account/>
            <FetchPostListView/>
        </div>
    );
}

export default App;
