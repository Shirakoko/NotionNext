import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 跳转到评论区
 * @returns {JSX.Element}
 * @constructor
 */
const ButtonJumpToComment = () => {
  if (!siteConfig('HEXO_WIDGET_TO_COMMENT', null, CONFIG)) {
    return <></>
  }
  const { locale } = useGlobal()

  function navToComment() {
    if (document.getElementById('comment')) {
      window.scrollTo({
        top: document.getElementById('comment').offsetTop,
        behavior: 'smooth'
      })
    }
    // 兼容性不好
    // const commentElement = document.getElementById('comment')
    // if (commentElement) {
    // commentElement?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
  }

  return (
    <div
      title={locale.COMMON.COMMENTS}
      className='flex space-x-1 items-center justify-center transform hover:scale-105 duration-200 w-7 h-7 text-center'
      onClick={navToComment}>
      <i className='fas fa-comment text-xs' />
    </div>
  )
}

export default ButtonJumpToComment
