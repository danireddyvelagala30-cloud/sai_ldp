import { useState } from "react";
import "./App.css";
import Checkbox from "./components/atoms/checkbox/Checkbox";
import Text from "./components/atoms/text/Text";
import Button from "./components/atoms/button/Button";
import Icon from "./components/atoms/icon/Icon";
import Slider from "./components/atoms/slider/Slider";
import Avatar from "./components/atoms/avatar/Avatar";
import Chip from "./components/atoms/chip/Chip";

const App = () => {
  const [sliderVal, setSliderVal] = useState(350000);
  const [isChecked, setIsChecked] = useState(true);

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="app-header-left">
          <Icon name="logo" size={32} />
          <Text text="Seeder Design System - Atoms" variant="white" fontSize={24} fontWeight="bold" />
        </div>
        <Avatar
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          alt="User Profile"
          showDropdown={true}
        />
      </div>

      <div className="grid-container">
        {/* Button Atom */}
        <div className="section">
          <h2 className="section-title">Button Atom</h2>
          <div className="demo-col">
            <Button
              label="Review Your Credit"
              variant="primary"
              fullWidth={true}
            />
            <div className="demo-row">
              <Button
                label="Back"
                variant="back"
                startIcon={<Icon name="back" size={16} color="#E8E7F0" />}
              />
              <Button label="Reset" variant="reset" size="small" />
            </div>
            <Button
              label="Cash Acceleration"
              variant="nav"
              active={true}
              startIcon={<Icon name="cash-acceleration" size={20} color="#FFFFFF" />}
            />
            <Button
              label="Watch how to"
              variant="ghost"
              startIcon={<Icon name="lightning" size={18} color="#A5A5B2" />}
            />
          </div>
        </div>

        {/* Icon Atom */}
        <div className="section">
          <h2 className="section-title">Icon Atom</h2>
          <div className="icons-grid">
            <div className="icon-item">
              <Icon name="logo" size={28} />
              <Text text="Logo" variant="muted" fontSize={12} />
            </div>
            <div className="icon-item">
              <Icon name="home" size={24} color="#A5A5B2" />
              <Text text="Home" variant="muted" fontSize={12} />
            </div>
            <div className="icon-item">
              <Icon name="cash-acceleration" size={24} color="#6C5DD3" />
              <Text text="Cash" variant="muted" fontSize={12} />
            </div>
            <div className="icon-item">
              <Icon name="back" size={20} color="#E8E7F0" />
              <Text text="Back" variant="muted" fontSize={12} />
            </div>
            <div className="icon-item">
              <Icon name="info" size={20} color="#727080" />
              <Text text="Info" variant="muted" fontSize={12} />
            </div>
            <div className="icon-item">
              <Icon name="lightning" size={20} color="#FFB800" />
              <Text text="Lightning" variant="muted" fontSize={12} />
            </div>
          </div>
        </div>

        {/* Slider Atom */}
        <div className="section">
          <h2 className="section-title">Slider Atom</h2>
          <div className="demo-col">
            <div className="demo-space-between">
              <Text text="Slide to autoselect" variant="muted" fontSize={14} />
              <Button label="Reset" variant="reset" size="small" onClick={() => setSliderVal(0)} />
            </div>
            <Slider
              value={sliderVal}
              min={0}
              max={880000}
              step={5000}
              onChange={(val) => setSliderVal(val)}
            />
            <div className="slider-value-display">
              <Text
                text={`$${sliderVal.toLocaleString()} selected of `}
                variant="primary"
                fontSize={14}
                fontWeight="bold"
              />
              <Text text="$880,000.00" variant="light" fontSize={14} fontWeight="bold" />
            </div>
          </div>
        </div>

        {/* Chip / Badge Atom */}
        <div className="section">
          <h2 className="section-title">Chip / Badge Atom</h2>
          <div className="demo-wrap-row">
            <Chip label="12.0% fee" variant="fee" />
            <Chip label="12 months" variant="default" />
            <Chip label="Active Kick" variant="purple" />
            <Chip label="Monthly" variant="outline" />
          </div>
        </div>

        {/* Checkbox & Text Atom */}
        <div className="section">
          <h2 className="section-title">Checkbox & Text Atoms</h2>
          <div className="demo-col">
            <div className="component-demo">
              <Checkbox checked={isChecked} onChange={(c) => setIsChecked(c)} />
              <Text text="Contract 1" variant="light" fontSize={15} fontWeight="bold" />
              <Chip label="Monthly" variant="outline" size="small" />
            </div>
            <div className="component-demo">
              <Checkbox checked={false} />
              <Text text="Contract 2 (Unchecked)" variant="muted" fontSize={15} />
            </div>
          </div>
        </div>

        {/* Avatar Atom */}
        <div className="section">
          <h2 className="section-title">Avatar Atom</h2>
          <div className="demo-row">
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              size="large"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              size="medium"
              showDropdown={true}
            />
            <Avatar fallback="SK" size="medium" />
            <Avatar fallback="AD" size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;