import ReactDOM from 'react-dom/client';
import App from './components/App';

const el=document.querySelector("#root");
const root=ReactDOM.createRoot(el);

root.render(<App/>);