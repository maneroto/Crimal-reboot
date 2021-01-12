import Button from './components/Atoms/Button';
import Input from './components/Atoms/Input';
import Icon from './components/Atoms/Icon';

function App() {
    return (
        <div className="App">
            <Button>Button example</Button>
            <Input
                name="email"
                type="email"
                placeholder="Enter your email here"
            />
            <Icon icon="book" className="btn-icon" />
        </div>
    );
}

export default App;
