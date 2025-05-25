import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div>
      {/* Light Mode Logo */}
      <Image
        src="https://res.cloudinary.com/dsalsyu0z/image/upload/v1748183936/1_s5yiea.png"
        alt="Logo Light"
        width={200}
        height={200}
        className="block dark:hidden"
      />

      {/* Dark Mode Logo */}
      <Image
        src="https://res.cloudinary.com/dsalsyu0z/image/upload/v1748183529/2_fqzhde.png" // replace with actual dark image URL
        alt="Logo Dark"
        width={200}
        height={200}
        className="hidden dark:block"
      />
    </div>
  )
}

export default Logo;

