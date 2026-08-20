import { useState } from "react";
import ButtonAtom from "./components/atoms/ButtonAtom";
import CheckboxAtom from "./components/atoms/CheckboxAtom";
import InputAtom from "./components/atoms/InputAtom";
import RadioAtom from "./components/atoms/RadioAtom";
import SelectAtom from "./components/atoms/SelectAtom";
import TextAtom from "./components/atoms/TextAtom";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("option1");
  const [selectedOption, setSelectedOption] = useState("");

  const selectOptions = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextAtom as="h1">RTL Test Cases Practice</TextAtom>

      <TextAtom as="p">Demonstration of reusable UI Atoms:</TextAtom>

      <InputAtom
        label="Username"
        placeholder="Enter your username"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <CheckboxAtom
        label="Accept Terms and Conditions"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />

      <div style={{ display: "flex", gap: "16px" }}>
        <RadioAtom
          label="Option 1"
          name="sampleRadio"
          value="option1"
          checked={selectedRadio === "option1"}
          onChange={(e) => setSelectedRadio(e.target.value)}
        />
        <RadioAtom
          label="Option 2"
          name="sampleRadio"
          value="option2"
          checked={selectedRadio === "option2"}
          onChange={(e) => setSelectedRadio(e.target.value)}
        />
      </div>

      <SelectAtom
        label="Select a Category"
        options={selectOptions}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      />

      <ButtonAtom onClick={() => alert("Button clicked!")}>
        Login
      </ButtonAtom>
    </div>
  );
};

export default App;