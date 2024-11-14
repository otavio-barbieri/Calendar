import "./App.css";
import Select from "./components/Select/Select";
import { Calendar } from "./components/Calendar";
import CalendarRoot from "./components/Calendar/CalendarRoot";

function App() {

  return (
    <>
      <CalendarRoot />

      <Select
      variant="ghost"
      size="mini"
      spacing="tigh"
        placeholder="Pao com ovo é totoso"
        options={[
          { key: "Hell", value: 2 },
          { key: "DOG", value: 3 },
          { key: "DOGoo", value: 4 },
          { key: "WOW", value: 5 },
          { key: "SCADUSH", value: 6 },
          { key: "KUNG FU PANDA 2", value: 69 },
        ]}
      />

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat
        suscipit repellat exercitationem tempore illum sapiente. Harum non sit
        assumenda molestias deleniti, sequi nemo in veniam voluptatem debitis,
        repellat dolores perferendis?
      </p>

      <Calendar.Root>
        <Calendar.Header />
      </Calendar.Root>
    </>
  );
}

export default App;
