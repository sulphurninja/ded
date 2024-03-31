import { useContext } from 'react';
import { news, whoToFollow } from '../lib/static'
import { BiSearch } from 'react-icons/bi'
import { TwitterContext } from '../context/TwitterContext';
import SmallPost from './SmallPost';

interface Tweet {
  author: TweetAuthor
  tweet: string
  timestamp: string
  image: string
}

interface User {
 name: string
 walletAddress: string
 profileImage: string
}

interface TweetAuthor {
  name: string
  walletAddress: string
  profileImage: string
  isProfileImageNft: boolean
}

const style = {
  wrapper: `flex-[1] p-4`,
  searchBar: `flex items-center bg-[#243340] p-2 rounded-3xl`,
  searchIcon: `text-[#8899a6] mr-2`,
  inputBox: `bg-transparent outline-none`,
  section: `bg-[#192734] my-6 rounded-xl overflow-hidden`,
  title: `p-2 font-bold text-lg`,
  showMore: `p-2 text-[#1d9bf0] text-sm cursor-pointer hover:bg-[#22303c]`,
  item: `flex items-center p-3 my-2 hover:bg-[#22303c] cursor-pointer`,
  newsItemLeft: `flex-1`,
  newsItemCategory: `text-[#8899a6] text-xs font-semibold`,
  newsItemTitle: `text-sm font-bold`,
  newsItemRight: `w-1/5 ml-3`,
  newsItemImage: `rounded-xl h-14 w-14 object-cover`,
  followAvatarContainer: `w-1/6`,
  followAvatar: `rounded-full h-[40px] w-[40px]`,
  profileDetails: `flex-1`,
  name: `font-bold`,
  handle: `text-[#8899a6]`,
  followButton: `bg-white text-black px-3 py-1 rounded-full text-xs font-bold`,
}

function Widgets() {
const { tweets, users } = useContext(TwitterContext);
console.log(users, 'users')
  return (
    <div className={style.wrapper}>
      <div className={style.searchBar}>
        <BiSearch className={style.searchIcon} />
        <input
          placeholder='Search Decent Media'
          type='text'
          className={style.inputBox}
        />
      </div>
      <div className={style.section}>
        <div className={style.title}>What's happening</div>
        {tweets.slice(0, 5).map((tweet: Tweet, index: number) => (
          <SmallPost
            key={index}
            displayName={
              tweet.author.name === 'Unnamed'
                ? `${tweet.author.walletAddress.slice(0, 4)}...${tweet.author.walletAddress.slice(41)}`
                : tweet.author.name
            }
            userName={`${tweet.author.walletAddress.slice(0, 4)}...${tweet.author.walletAddress.slice(41)}`}
            text={tweet.tweet}
            avatar={tweet.author.profileImage}
            image={tweet.image}
            isProfileImageNft={tweet.author.isProfileImageNft}
            timestamp={tweet.timestamp}
          />
        ))}

        <div className={style.showMore}>Show more</div>
      </div>
      <div className={style.section}>
        <div className={style.title}>Who to follow</div>
        {users.slice(1, 6).map((user: User, index: number) => (
          <div key={index} className={style.item}>
            <div className={style.followAvatarContainer}>
              <img
                src={user.profileImage}
                alt={user.profileImage}
                className={style.followAvatar}
              />
            </div>
            <div className={style.profileDetails}>
              <div className={style.name}>{user.name}</div>
              {/* <div className={style.handle}>{user.walletAddress}</div> */}
            </div>
            <div className={style.followButton}>Follow</div>
          </div>
        ))}
        <div className={style.showMore}>Show more</div>
      </div>
    </div>
  )
}

export default Widgets
