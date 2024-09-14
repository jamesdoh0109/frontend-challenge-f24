import { Course } from "@/utils/types";

interface EmailProps {
  receipt: Course[];
}

export default function Email({ receipt }: EmailProps) {
  return (
    <div>
      <p>Hi there!👋</p>
      <p>
        Thanks for checking out on Penn Course Cart. How was your experience
        using our platform? We want to make sure your course selection process
        was as smooth as possible. If you have any feedback or encounter any
        issues while browsing or registering for courses, feel free to reach
        out! Happy course hunting!
      </p>
      <p>Here are your registered courses:</p>
      <div style={{ paddingLeft: "12px" }}>
        {receipt.map((course) => (
          <div key={course.id}>
            -{course.dept}-{course.number}: {course.title}
          </div>
        ))}
      </div>
      <p>Thank you for using Penn Course Cart!</p>
      <p>James</p>
    </div>
  );
}
