import { cn } from '@/helpers/cn'

export const DancingSanta = () => {
  return (
    <div className="absolute flex items-center  justify-center rounded-md">
      <div className="z-[10] rounded-full bg-white p-10 shadow-2xl">
        <img
          className="z-[10] w-[250px] rounded-full"
          alt="santa"
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW96bWozcHBiYnhyeW05eGt1bDd1MmR2cTA1MGo1ZGJlOXZ6Nzc5NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kfozgIgxf5qyvWwByh/giphy.gif"
          // width="460"
          // height="680"
        />
      </div>
    </div>
  )
}

function RidingSanta({ className = '' }) {
  return (
    <img
      className={cn('absolute z-[999]', className)}
      alt="santa"
      src="https://img1.picmix.com/output/stamp/normal/3/6/8/9/2409863_0d10d.gif"
    />
  )
}

function RidingSantas({ className = '' }) {
  return (
    <>
      <div className="absolute left-[10%] flex h-96 w-96 items-center justify-center rounded-full">
        <DancingSanta />
      </div>
      <div className="absolute right-[10%] flex h-96 w-96 items-center justify-center rounded-full">
        <DancingSanta />
      </div>
      <div className="absolute z-[110] h-full w-full">
        <RidingSanta className="left-0 top-10 scale-x-[-1] animate-[slideRight_2s_linear_infinite]" />
        <RidingSanta className="absolute bottom-10 right-0 z-[999] animate-[slideLeft_2s_linear_infinite]" />
      </div>
    </>
  )
}
