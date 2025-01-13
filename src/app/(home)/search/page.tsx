import { SearchBar } from '../_components/SearchBar'

export default async function Search() {
  return (
    <div>
      <SearchBar />
      <ul>
        {/* {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))} */}
      </ul>
    </div>
  )
}
