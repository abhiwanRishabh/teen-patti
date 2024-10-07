import React from 'react'
import Text from '../../components/text/Text'

function UserName({ children }) {
  return (
    <div  >
      <Text title={children} color={"text-white sm:text-xs lg:text-base"}></Text>
    </div>
  )
}

export default UserName
