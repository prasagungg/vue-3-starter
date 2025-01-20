export type MenuChild = {
  id: number;
  code: string;
  name: string;
  action: string[];
};

export type MenuParent = {
  parentCode: string;
  child: MenuChild[];
};
