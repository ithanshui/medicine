package com.cnfwsy.spider.htmlparser.queue.zhaopin;

import java.util.concurrent.ConcurrentLinkedQueue;

import org.apache.log4j.Logger;

/**
 * 数据更新队列
 * 
 * @author zhangjh
 *
 */
public class _zhaopinComUpdateQueue {
	Logger logger = Logger.getLogger(_zhaopinComUpdateQueue.class.getName());
	private static ConcurrentLinkedQueue queue = new ConcurrentLinkedQueue();

	public static void put(Object t) {
		queue.add(t);
	}

	public static <T> T pop() {
		return (T) queue.poll();
	}
}
