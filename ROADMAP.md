# 🗺️ Ocean UI Component Roadmap

This roadmap tracks the development progress of all ARK UI components in Ocean UI. Components are organized by category and prioritized for fast shipping.

## 📊 Progress Overview

**Total Components:** 35  
**Completed:** 1 (3%)  
**In Progress:** 0  
**Planned:** 34

---

## 📦 Component Categories

### 🔘 Form Controls (20 components)

Essential input and form interaction components.

#### Phase 1 - Quick Wins (High Priority)

- [ ] **Toggle** - Simple on/off toggle switch (Easy, 2-3h, Very High Usage)
- [ ] **Slider** - Range input slider (Easy, 3-4h, Very High Usage)
- [ ] **Number Input** - Numeric input with increment/decrement (Easy, 2-3h, Very High Usage)
- [ ] **Password Input** - Password field with show/hide toggle (Easy, 2-3h, Very High Usage)
- [ ] **Field** - Form field wrapper with label and error handling (Easy, 2-3h, Very High Usage)
- [ ] **Fieldset** - Grouping container for form fields (Easy, 1-2h, High Usage)
- [ ] **Toggle Group** - Group of toggle buttons (Easy, 3-4h, High Usage)
- [ ] **Segment Group** - Segmented control for multiple options (Easy, 3-4h, High Usage)

#### Phase 2 - Essential Form Controls

- [ ] **Combobox** - Autocomplete input with dropdown (Medium, 4-5h, Very High Usage)
- [ ] **Listbox** - Selectable list component (Medium, 4-5h, High Usage)
- [ ] **Pin Input** - Multi-digit PIN/OTP input (Medium, 3-4h, Medium Usage)
- [ ] **Tags Input** - Multi-tag input field (Medium, 4-5h, High Usage)
- [ ] **Editable** - Inline editable text component (Medium, 4-5h, Medium Usage)
- [ ] **Rating Group** - Star rating input (Medium, 3-4h, Medium Usage)

#### Phase 5 - Complex Form Controls

- [ ] **Color Picker** - Color selection component (Hard, 8-10h, Medium Usage)
- [ ] **Date Picker** - Calendar date selection (Hard, 10-12h, High Usage)
- [ ] **File Upload** - File upload with drag & drop (Hard, 6-8h, High Usage)
- [ ] **Angle Slider** - Circular angle/rotation slider (Medium, 5-6h, Low Usage)
- [ ] **Signature Pad** - Digital signature capture (Hard, 8-10h, Low Usage)

---

### 📂 Disclosure (1 component)

Components for showing/hiding content.

- [x] **Accordion** - Collapsible content sections ✓
- [ ] **Collapsible** - Simple show/hide content (Medium, 3-4h, High Usage)

---

### 🎭 Overlay (2 components)

Components that overlay content on the page.

#### Phase 1 - Quick Wins

- [ ] **Hover Card** - Card that appears on hover (Easy, 3-4h, Medium Usage)

#### Phase 4 - Advanced Overlays

- [ ] **Floating Panel** - Floating panel overlay (Medium, 5-6h, Medium Usage)

---

### 📊 Data Display (2 components)

Components for displaying data and content.

#### Phase 4 - Utilities

- [ ] **QR Code** - QR code generator/display (Medium, 4-5h, Low Usage)

#### Phase 6 - Advanced Components

- [ ] **Carousel** - Image/content carousel slider (Hard, 10-12h, High Usage)

---

### 🧭 Navigation (3 components)

Components for navigating through content.

#### Phase 3 - Navigation & Structure

- [ ] **Pagination** - Page navigation controls (Medium, 4-5h, High Usage)
- [ ] **Steps** - Step indicator/wizard component (Medium, 5-6h, Medium Usage)
- [ ] **Tree View** - Hierarchical tree navigation (Hard, 8-10h, Medium Usage)

---

### 💬 Feedback (2 components)

Components that provide user feedback.

#### Phase 2 - Essential Form Controls

- [ ] **Progress (Circular)** - Circular progress indicator (Easy, 2-3h, High Usage)
- [ ] **Progress (Linear)** - Linear progress bar (Easy, 1-2h, High Usage)

---

### 🛠️ Utility (5 components)

Specialized utility components.

#### Phase 1 - Quick Wins

- [ ] **Scroll Area** - Custom scrollable container (Easy, 2-3h, High Usage)

#### Phase 3 - Navigation & Structure

- [ ] **Splitter** - Resizable panel splitter (Hard, 6-8h, Medium Usage)

#### Phase 4 - Advanced Overlays & Utilities

- [ ] **Clipboard** - Copy to clipboard functionality (Easy, 2-3h, Medium Usage)
- [ ] **Marquee** - Scrolling text marquee (Easy, 2-3h, Low Usage)
- [ ] **Timer** - Countdown/stopwatch timer (Medium, 4-5h, Low Usage)

#### Phase 6 - Advanced Components

- [ ] **Tour** - Product tour/onboarding component (Hard, 10-12h, Low Usage)

---

## 🚀 Development Phases

### Phase 1: Quick Wins (Week 1-2)

**Goal:** Ship 10 components fast to build momentum

**Components:** Toggle, Slider, Number Input, Password Input, Field, Fieldset, Toggle Group, Segment Group, Scroll Area, Hover Card

**Estimated Time:** 25-35 hours

---

### Phase 2: Essential Form Controls (Week 3-4)

**Goal:** Complete core form functionality

**Components:** Combobox, Listbox, Pin Input, Tags Input, Editable, Rating Group, Progress (Circular), Progress (Linear)

**Estimated Time:** 25-32 hours

---

### Phase 3: Navigation & Structure (Week 5-6)

**Goal:** Complete navigation patterns

**Components:** Pagination, Steps, Tree View, Splitter

**Estimated Time:** 23-29 hours

---

### Phase 4: Advanced Overlays & Utilities (Week 7-8)

**Goal:** Complete overlay patterns and utilities

**Components:** Floating Panel, Clipboard, Marquee, QR Code, Timer

**Estimated Time:** 17-22 hours

---

### Phase 5: Complex Form Controls (Week 9-10)

**Goal:** Advanced input components

**Components:** Color Picker, Date Picker, File Upload, Angle Slider, Signature Pad

**Estimated Time:** 37-46 hours

---

### Phase 6: Advanced Components (Week 11-12)

**Goal:** Complex, specialized components

**Components:** Carousel, Tour

**Estimated Time:** 20-24 hours

---

## 📈 Success Metrics

- **Phase 1 Completion:** 11 total components (10 new + Accordion) shipped in 2 weeks
- **Phase 2 Completion:** 19 total components (8 new) in 4 weeks
- **Phase 3 Completion:** 23 total components (4 new) in 6 weeks
- **Phase 4 Completion:** 28 total components (5 new) in 8 weeks
- **Phase 5 Completion:** 33 total components (5 new) in 10 weeks
- **Phase 6 Completion:** 35 total components (2 new) in 12 weeks

---

## 🎯 Priority Guidelines

Components are prioritized based on:

1. **Usage Frequency** - Most commonly used components first
2. **Complexity** - Easy components before hard ones
3. **Development Time** - Quick wins to build momentum
4. **Dependencies** - Components that others depend on

---

## 📝 Notes

- Progress variants (Circular/Linear) can be added as examples/variants of existing Progress component
- SolidJS versions can be developed in parallel or after React versions
- Each component includes: implementation, demos, documentation, and registry updates
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines

---

**Last Updated:** 2024
