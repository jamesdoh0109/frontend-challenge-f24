import Tag from "@/components/Course/Tag";
import styles from "@/components/Course/TagGroup.module.css";

interface TagGroupProps {
  tags: string[];
}

export default function TagGroup({ tags }: TagGroupProps) {
  return (
    <div className={styles.taggroup}>
      {tags.map((tag) => (
        <Tag key={tag} text={tag} />
      ))}
    </div>
  );
}
