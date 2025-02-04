import CreatePostModal from "../components/Timeline/CreatePostModal"
import Feed from "../components/Timeline/Feed"
import { CreatePostModalState } from "../context/Atoms"
import { useRecoilValue } from "recoil"
const Home = () => {
  const CreatePostModalVisibility=useRecoilValue(CreatePostModalState)
  return (
    <main className="">
     
      <Feed  />  {/* Feed takes up the remaining space */}
      {CreatePostModalVisibility && <CreatePostModal />}
     
    </main>
  )
}

export default Home

