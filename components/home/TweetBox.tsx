import { useState, useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'
import { client } from '../../lib/client'

const style = {
  wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1`,
  profileImage: `height-12 w-12 rounded-full`,
  inputField: `w-full h-full outline-none bg-transparent text-lg`,
  formLowerContainer: `flex`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2 cursor-pointer`,
  submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,
}

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState('');

  const { currentAccount, fetchTweets, currentUser } =
    useContext(TwitterContext)

  const submitTweet = async (event: any) => {
    event.preventDefault();

    if (!tweetMessage) return;

    // Check if tweetImage is set and not an empty string
    const imageField = tweetImage ? { image: { url: tweetImage  } } : {};

    const tweetId = `${currentAccount}_${Date.now()}`;

    const tweetDoc = {
      _type: 'tweets',
      _id: tweetId,
      tweet: tweetMessage,
      timestamp: new Date(Date.now()).toISOString(),
      author: {
        _key: tweetId,
        _ref: currentAccount,
        _type: 'reference',
      },
      ...imageField, // Include the image field if tweetImage is set
    };

    await client.createIfNotExists(tweetDoc);

    await client
      .patch(currentAccount)
      .setIfMissing({ tweets: [] })
      .insert('after', 'tweets[-1]', [
        {
          _key: tweetId,
          _ref: tweetId,
          _type: 'reference',
        },
      ])
      .commit()

    await fetchTweets()
    setTweetMessage('')
  }


  const [showModal, setShowModal] = useState(false);

  const handleImageSubmit = () => {
    // Here you can submit the tweetImage URL
    console.log('Submitted tweetImage URL:', tweetImage);

    // You can also perform additional actions like closing the modal
    setShowModal(false);
  };


  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
        <img
          src={currentUser.profileImage}
          className={
            currentUser.isProfileImageNft
              ? `${style.profileImage} smallHex`
              : style.profileImage
          }
        />
      </div>
      <div className={style.tweetBoxRight}>
        <form>
          <textarea
            onChange={e => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            className={style.inputField}
          />
          <div className={style.formLowerContainer}>
            <div className={style.iconsContainer}>
              <BsCardImage className={style.icon} onClick={() => setShowModal(true)} />
              {/* Modal for entering tweetImage URL */}
              {showModal && (
                <div className="modal ">
                  <div className="modal-content">
                    <input
                      type="text"
                      placeholder="Enter tweet image URL"
                      value={tweetImage}
                      onChange={(e) => setTweetImage(e.target.value)}
                    />
        
                    <button className='p-4' onClick={() => setShowModal(false)}>X</button>
                  </div>
                </div>
              )}
              <RiFileGifLine className={style.icon} />
              <RiBarChartHorizontalFill className={style.icon} />
              <BsEmojiSmile className={style.icon} />
              <IoMdCalendar className={style.icon} />
              <MdOutlineLocationOn className={style.icon} />
            </div>
            <button
              type='submit'
              onClick={event => submitTweet(event)}
              disabled={!tweetMessage}
              className={`${style.submitGeneral} ${tweetMessage ? style.activeSubmit : style.inactiveSubmit
                }`}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetBox
