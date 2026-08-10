import { MotionProvider } from "@/design-system/motion/motion";
import { AppRouter } from "@/routes/AppRouter";

function App() {
  return (
    <MotionProvider>
      <AppRouter />
    </MotionProvider>
  );
}

export default App;
