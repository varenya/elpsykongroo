// function DropDown(props) {
//   const [selectedItem, handleSelectedItem] = useState(props.initialValue)
//   return (
//     <select
//       value={selectedItem}
//       onChange={e => handleSelectedItem(e.target.value)}
//     >
//       {props.options.map(eachOption => (
//         <option value={eachOption.value}>{eachOption.label}</option>
//       ))}
//     </select>
//   )
// }

const DropDownContext = React.createContext('')

function DropDown(props) {
  const [selectedItem, handleSelectedItem] = useState(props.initialValue)
  return (
    <ul className="custom_dropdown">
      <DropDownContext.Provider value={{ selectedItem, handleSelectedItem }}>
        {props.children}
      </DropDownContext.Provider>
    </ul>
  )
}

function Option(props) {
  const { selectedItem, handleSelectedItem } = useContext(DropDownContext)
  return (
    <li
      className="custom_dropdown_item"
      selected={selectedItem === value}
      onClick={() => handleSelectedItem(value)}
      value={props.value}
    >
      {option.label}
    </li>
  )
}

<DropDown>
  <Option value={1} label="One" />
  <Option value={2} label="Two" />
  <Option value={3} label="Three" />
</DropDown>
