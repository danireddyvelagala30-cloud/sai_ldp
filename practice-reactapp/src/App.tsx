import PropsDemo from "./PropsDemo";
import HooksDemo from "./HooksDemo";
import TypeScriptPractice from "./components/TypeScriptPractice";
function App() {
  const student = {
    name: "Reddy",
    age: 24,
  };

  const fruits = [
    "Apple",
    "Orange",
    "Banana",
    "Mango",
  ];

  function displayMessage() {
    alert("Function Prop Executed");
  }

  return (
    <>
    <PropsDemo
      name="Reddy"
      age={24}
      isStudent={true}
      student={student}
      fruits={fruits}
      showMessage={displayMessage}
      city="Hyderabad"
    >
      <h3 style={{ color: "blue" }}>
        This is Children Prop
      </h3>
    </PropsDemo>
    <HooksDemo />
    <TypeScriptPractice />
    </>
  );
}

export default App;