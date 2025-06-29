import { FormBuilder } from "@/components/form-builder";
import { FormBuilderProvider } from "@/context/form-builder-context";

function App() {
  return (
    <FormBuilderProvider>
      <FormBuilder/>
    </FormBuilderProvider>
  )
}

export default App
