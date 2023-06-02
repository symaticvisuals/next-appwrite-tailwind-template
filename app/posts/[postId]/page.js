import React from 'react'

function page(
    { params: { postId } } //
) {
  return (
      <div>{postId} here</div>
  )
}

export default page